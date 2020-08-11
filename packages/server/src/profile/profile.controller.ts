import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetProfileResponse, UpdateProfileParams } from '@template/common';
import { pick } from 'lodash';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { NotificationService } from '../notification/notification.service';
import { User } from './user.decorator';
import { UserModel } from './user.entity';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private connection: Connection,
    private notifService: NotificationService,
  ) {}

  @Get()
  async get(
    @User(['courses', 'courses.course']) user: UserModel,
  ): Promise<GetProfileResponse> {
    const courses = user.courses
      .filter((userCourse) => userCourse.course.enabled)
      .map((userCourse) => {
        return {
          course: {
            id: userCourse.courseId,
            name: userCourse.course.name,
          },
          role: userCourse.role,
        };
      });

    const phoneNotifModel = await PhoneNotifModel.findOne({
      where: {
        userId: user.id,
      },
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
      phoneNumber: phoneNotifModel?.phoneNumber,
    };
  }

  @Patch()
  async patch(
    @Body() userPatch: UpdateProfileParams,
    @User(['courses', 'courses.course']) user: UserModel,
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

    const phoneNotifModel = await PhoneNotifModel.findOne({
      where: {
        userId: user.id,
      },
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
      phoneNumber: phoneNotifModel.phoneNumber,
    };
  }
}
