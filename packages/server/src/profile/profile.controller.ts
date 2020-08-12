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
    @User(['courses', 'courses.course', 'phoneNotif']) user: UserModel,
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

  @Patch()
  async patch(
    @Body() userPatch: UpdateProfileParams,
    @User(['courses', 'courses.course', 'phoneNotif']) user: UserModel,
  ): Promise<GetProfileResponse> {
    user = Object.assign(user, userPatch);
    await user.save();
    if (user.phoneNotifsEnabled && userPatch.phoneNumber) {
      user.phoneNotif = await this.notifService.registerPhone(
        userPatch.phoneNumber,
        user.id,
      );
    }

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
}
