import {
  ERROR_MESSAGES,
  GetSelfEnrollResponse,
  Role,
  UBCOloginParam,
} from '@koh/common';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CourseModel } from 'course/course.entity';
import { User } from 'decorators/user.decorator';
import { Response } from 'express';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
//import * as httpSignature from 'http-signature';
import { UserCourseModel } from 'profile/user-course.entity';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'profile/user.entity';
// import { questionEMail } from 'readline-sync';
import { Connection } from 'typeorm';
import { LoginCourseService } from './login-course.service';

@Controller()
export class LoginController {
  constructor(
    private connection: Connection,
    private loginCourseService: LoginCourseService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  //front post to this
  @Post('/ubc_login')
  async receiveDataFromLogin(
    @Res() res: Response,
    @Body() body: UBCOloginParam,
  ): Promise<any> {
    const user = await UserModel.findOne({
      where: { email: body.email },
      relations: ['organizationUser', 'organizationUser.organization'],
    });

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'User Not found' });
    }

    if (
      user.organizationUser &&
      user.organizationUser.organization.legacyAuthEnabled === false
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Organization does not allow legacy auth',
      });
    }

    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { expiresIn: 60 },
    );

    if (token === null || token === undefined) {
      console.error('Temporary JWT is invalid');
      throw new HttpException(
        ERROR_MESSAGES.loginController.invalidTempJWTToken,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (user.password === null || user.password === undefined) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'User did not sign up with legacy account system',
      });
    }

    bcrypt.compare(body.password, user.password, (err, data) => {
      //if error than throw error
      if (err) throw err;

      //if both match than you can do anything
      if (data) {
        if (user.accountDeactivated) {
          return res.status(HttpStatus.FORBIDDEN).send({
            message: 'Account deactivated',
          });
        }
        return res.status(200).send({ token, ...body });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  }

  // NOTE: Although the two routes below are on the backend,
  // they are meant to be visited by the browser so a cookie can be set

  // This is the real admin entry point, Kevin changed to also just take a user id, change to that sign in only
  @Get('/login/entry')
  async enterUBCOH(
    @Res() res: Response,
    @Query('token') token: string,
    @Query('redirect') redirect?: string,
  ): Promise<void> {
    const isVerified = await this.jwtService.verifyAsync(token);

    if (!isVerified) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.decode(token) as { userId: number };
    await this.enter(res, payload.userId, redirect);
  }

  // Set cookie and redirect to proper page
  private async enter(res: Response, userId: number, redirect?: string) {
    // Expires in 30 days
    const authToken = await this.jwtService.signAsync({
      userId,
      expiresIn: 60 * 60 * 24 * 30,
    });

    if (authToken === null || authToken === undefined) {
      throw new HttpException(
        ERROR_MESSAGES.loginController.invalidTempJWTToken,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');

    res
      .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
      .redirect(302, redirect ? redirect : '/courses');
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

  @Get('self_enroll_courses')
  async selfEnrollEnabledAnywhere(): Promise<GetSelfEnrollResponse> {
    const courses = await CourseModel.find();
    return { courses: courses.filter((course) => course.selfEnroll) };
  }

  @Post('create_self_enroll_override/:id')
  @UseGuards(JwtAuthGuard)
  async createSelfEnrollOverride(
    @Param('id') courseId: number,
    @User() user: UserModel,
  ): Promise<void> {
    const course = await CourseModel.findOne(courseId);

    if (!course.selfEnroll) {
      throw new UnauthorizedException(
        'Cannot self-enroll to this course currently',
      );
    }

    const prevUCM = await UserCourseModel.findOne({
      where: {
        courseId,
        userId: user.id,
      },
    });

    if (prevUCM) {
      throw new BadRequestException(
        'User already has an override for this course',
      );
    }

    await UserCourseModel.create({
      userId: user.id,
      courseId: courseId,
      role: Role.STUDENT,
      override: true,
      expires: true,
    }).save();
  }

  // get all courses related to user to log in.
  @Post('getAllcourses')
  async getCourses(
    @Res() res: Response,
    @Body() body: UBCOloginParam,
  ): Promise<any> {
    const user = await UserModel.findOne({
      where: { email: body.email },
    });
    if (!user) {
      return res.status(404).send({ message: 'User Not found' });
    }
    const userCourse = await UserCourseModel.find({
      where: {
        userId: user.id,
      },
    });
    if (!userCourse) {
      return res.status(400).json({ message: 'NotInCourse' });
    }
    bcrypt.compare(body.password, user.password, (err, data) => {
      //if error than throw error
      if (err) throw err;

      //if both match than you can do anything
      if (data) {
        return res.status(200).send(userCourse);
      } else {
        return res.status(401).json({ message: 'Invalid credential' });
      }
    });
  }
}
