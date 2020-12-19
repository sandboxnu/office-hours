import { apm } from '@elastic/apm-rum';
import {
  KhouryDataParams,
  KhouryRedirectResponse,
  KhouryStudentCourse,
  KhouryTACourse,
  Role,
} from '@koh/common';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as httpSignature from 'http-signature';
import { Connection } from 'typeorm';
import { CourseModel } from '../../src/course/course.entity';
import { NonProductionGuard } from '../../src/non-production.guard';
import { UserModel } from '../../src/profile/user.entity';
import { CourseSectionMappingModel } from './course-section-mapping.entity';
import { LoginCourseService } from './login-course.service';

@Controller()
export class LoginController {
  constructor(
    private connection: Connection,
    private loginCourseService: LoginCourseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('/khoury_login')
  async recieveDataFromKhoury(
    @Req() req: Request,
    @Body() body: KhouryDataParams,
  ): Promise<KhouryRedirectResponse> {
    if (process.env.NODE_ENV === 'production') {
      // Check that request has come from Khoury
      const parsedRequest = httpSignature.parseRequest(req);
      const verifySignature = httpSignature.verifyHMAC(
        parsedRequest,
        this.configService.get('KHOURY_PRIVATE_KEY'),
      );
      if (!verifySignature) {
        apm.captureError('Invalid request signature');
        throw new UnauthorizedException('Invalid request signature');
      }
      // This checks if the request is coming from one of the khoury servers
      const verifyIP = this.configService
        .get('KHOURY_SERVER_IP')
        .includes(req.ip);
      if (!verifyIP) {
        apm.captureError(
          'The IP of the request does not seem to be coming from the Khoury server',
        );
        throw new UnauthorizedException(
          'The IP of the request does not seem to be coming from the Khoury server',
        );
      }
    }

    let user: UserModel;
    user = await UserModel.findOne({
      where: { email: body.email },
      relations: ['courses'],
    });

    if (!user) {
      user = await UserModel.create({ courses: [] });
    }

    // Q: Do we need this if it's not going to change?
    user = Object.assign(user, {
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      name: body.first_name + ' ' + body.last_name,
      photoURL: '',
    });
    await user.save();

    const userCourses = [];
    await Promise.all(
      body.courses.map(async (c: KhouryStudentCourse) => {
        const course: CourseModel = await this.loginCourseService.courseSectionToCourse(
          c.course,
          c.section,
        );

        if (course) {
          const userCourse = await this.loginCourseService.courseToUserCourse(
            user.id,
            course.id,
            Role.STUDENT,
          );
          userCourses.push(userCourse);
        }
      }),
    );

    await Promise.all(
      body.ta_courses.map(async (c: KhouryTACourse) => {
        // Query for all the courses which match the name of the generic course from Khoury
        const courseMappings = await CourseSectionMappingModel.find({
          where: { genericCourseName: c.course }, // TODO: Add semester support
        });

        for (const courseMapping of courseMappings) {
          const taCourse = await this.loginCourseService.courseToUserCourse(
            user.id,
            courseMapping.courseId,
            body.professor === '1' ? Role.PROFESSOR : Role.TA,
          );
          userCourses.push(taCourse);
        }
      }),
    );
    user.courses = userCourses;
    await user.save();

    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: 5 * 60 },
    );
    return {
      redirect:
        this.configService.get('DOMAIN') + `/api/v1/login/entry?token=${token}`,
    };
  }

  // NOTE: Although the two routes below are on the backend,
  // they are meant to be visited by the browser so a cookie can be set

  // This is the real admin entry point
  @Get('/login/entry')
  async enterFromKhoury(
    @Res() res: Response,
    @Query('token') token: string,
  ): Promise<void> {
    const isVerified = await this.jwtService.verifyAsync(token);

    if (!isVerified) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.decode(token) as { userId: number };

    this.enter(res, payload.userId);
  }

  // This is for login on development only
  @Get('/login/dev')
  @UseGuards(NonProductionGuard)
  async enterFromDev(
    @Res() res: Response,
    @Query('userId') userId: number,
  ): Promise<void> {
    this.enter(res, userId);
  }

  // Set cookie and redirect to proper page
  private async enter(res: Response, userId: number) {
    const authToken = await this.jwtService.signAsync({ userId });
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
      .redirect(302, '/');
  }

  @Get('/logout')
  async logout(@Res() res: Response): Promise<void> {
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .clearCookie('auth_token', { httpOnly: true, secure: isSecure })
      .redirect(302, '/login');
  }
}
