import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserModel } from './user.entity';
import { pick } from 'lodash';
import { GetProfileResponse, UpdateProfileParams } from '@template/common';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { User } from './user.decorator';
import { NotificationService } from '../notification/notification.service';

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
    const prevPhoneNotifsEnabled = user.phoneNotifsEnabled;
    user = Object.assign(user, userPatch);
    if (
      !prevPhoneNotifsEnabled &&
      user.phoneNotifsEnabled &&
      userPatch.phoneNumber
    ) {
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
}
