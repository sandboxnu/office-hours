import {
  Controller,
  Get,
  Res,
  Query,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { UserModel } from './user.entity';
import { pick } from 'lodash';
import { GetProfileResponse, UpdateProfileParams } from '@template/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';
import { NotificationService } from '../notification/notification.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private connection: Connection,
    private jwtService: JwtService,
    private notifService: NotificationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async get(
    @User(['courses', 'courses.course', 'phoneNotif']) user: UserModel,
  ): Promise<GetProfileResponse> {
    const courses = user.courses.map((userCourse) => {
      return {
        course: {
          id: userCourse.courseId,
          name: userCourse.course.name,
        },
        role: userCourse.role,
      };
    });

    const userResponse = pick(user, [
      'id',
      'email',
      'name',
      'photoURL',
      'desktopNotifsEnabled',
      'phoneNotifsEnabled',
    ]);
    return {
      ...userResponse,
      courses,
      phoneNumber: user.phoneNotif?.phoneNumber,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patch(
    @Body() userPatch: UpdateProfileParams,
    @User(['courses', 'courses.course', 'phoneNotif']) user: UserModel,
  ): Promise<GetProfileResponse> {
    user = Object.assign(user, userPatch);
    if (user.phoneNotifsEnabled && userPatch.phoneNumber) {
      await this.notifService.registerPhone(userPatch.phoneNumber, user.id);
    }
    await user.save();

    const courses = user.courses.map((userCourse) => {
      return {
        course: {
          id: userCourse.courseId,
          name: userCourse.course.name,
        },
        role: userCourse.role,
      };
    });

    const userResponse = pick(user, [
      'id',
      'email',
      'name',
      'photoURL',
      'desktopNotifsEnabled',
      'phoneNotifsEnabled',
    ]);
    return {
      ...userResponse,
      courses,
      phoneNumber: user.phoneNotif?.phoneNumber,
    };
  }

  // TODO handle the khoury flow for real.
  @Get('/entry')
  enterFromKhoury(@Res() res: Response, @Query('userId') userId: number): void {
    const token = this.jwtService.sign({ userId });
    res.cookie('auth_token', token).redirect(302, '/');
  }
}
