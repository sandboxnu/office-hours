import {
  Controller,
  Get,
  Res,
  Query,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../../src/profile/user.entity';
import { CourseModel } from '../../src/course/course.entity';
import { UserCourseModel } from '../../src/profile/user-course.entity';
import {
  Role,
  KhouryRedirectResponse,
  KhouryDataParams,
} from '@template/common';
import { NonProductionGuard } from '../../src/non-production.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
export class LoginController {
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post('/khoury_login')
  async recieveDataFromKhoury(
    @Body() body: KhouryDataParams,
  ): Promise<KhouryRedirectResponse> {
    let user: UserModel;
    user = await UserModel.findOne({
      where: { email: body.email },
      relations: ['courses'],
    });

    if (!user) {
      user = await UserModel.create({ courses: [] });
    }

    user = Object.assign(user, {
      email: body.email,
      name: body.first_name + body.last_name,
      photoURL: body.photo_url, // We'll have to find away around this becuase the photo urls expire
    });
    await user.save();

    // TODO: Check performanace on this, right now there are mad db queries in here
    async function courseNameToUserCourse(
      name: string,
      role: Role,
    ): Promise<UserCourseModel> {
      let course;
      course = await CourseModel.findOne({
        where: { name: name },
      });
      if (!course) {
        course = CourseModel.create({ name: name }); // TODO: Figure out how we want to specify the semester and add that
        await course.save();
      }
      let userCourse: UserCourseModel;
      userCourse = await UserCourseModel.findOne({
        where: { userId: user.id, courseId: course.id, role: role },
      });
      if (!userCourse) {
        userCourse = await UserCourseModel.create({
          userId: user.id,
          course: course,
          role: role,
        }).save();
      }
      return userCourse;
    }

    const userCourses = [];
    await Promise.all(
      body.courses
        .map(async (c) => {
          const userCourse = await courseNameToUserCourse(
            c.course,
            Role.STUDENT,
          );
          userCourses.push(userCourse);
        }),
    );
    await Promise.all(
      body.ta_courses
        .map(async (c) => {
          const taCourse = await courseNameToUserCourse(c.course, Role.TA);
          userCourses.push(taCourse);
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
    const userCourse = await UserCourseModel.findOne({
      where: { userId },
    });
    const redirectTo = userCourse
      ? `/course/${userCourse.courseId}/today`
      : '/nocourses';
    const authToken = await this.jwtService.signAsync({ userId });
    const isSecure = this.configService
      .get<string>('DOMAIN')
      .startsWith('https://');
    res
      .cookie('auth_token', authToken, { httpOnly: true, secure: isSecure })
      .redirect(302, redirectTo);
  }
}
