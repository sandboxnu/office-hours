import {
  DesktopNotifPartial,
  GetProfileResponse,
  UpdateProfileParams,
} from '@koh/common';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { pick } from 'lodash';
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
    @User(['courses', 'courses.course', 'phoneNotif', 'desktopNotifs'])
    user: UserModel,
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

    const desktopNotifs: DesktopNotifPartial[] = user.desktopNotifs.map(
      (d) => ({
        endpoint: d.endpoint,
        id: d.id,
        createdAt: d.createdAt,
        name: d.name,
      }),
    );

    const userResponse = pick(user, [
      'id',
      'email',
      'name',
      'firstName',
      'lastName',
      'photoURL',
      'desktopNotifsEnabled',
      'phoneNotifsEnabled',
    ]);
    return {
      ...userResponse,
      courses,
      phoneNumber: user.phoneNotif?.phoneNumber,
      desktopNotifs,
    };
  }

  @Patch()
  async patch(
    @Body() userPatch: UpdateProfileParams,
    @User(['courses', 'courses.course', 'phoneNotif', 'desktopNotifs'])
    user: UserModel,
  ): Promise<GetProfileResponse> {
    user = Object.assign(user, userPatch);
    user.name = user.firstName + ' ' + user.lastName;
    if (
      user.phoneNotifsEnabled &&
      userPatch.phoneNumber !== user.phoneNotif?.phoneNumber
    ) {
      await this.notifService.registerPhone(userPatch.phoneNumber, user);
    }
    await user.save();

    return this.get(user);
  }

  @Post('/upload_picture')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads/',
    }),
  )
  async uploadImage(
    @UploadedFile() file,
    @User() user: UserModel,
  ): Promise<void> {
    user.photoURL = file.filename;
    await user.save();

    console.log(file);
    const test = await UserModel.findOne(user.id);
    console.log(test);
  }

  @Get('/get_picture')
  async getImage(@User() user: UserModel, @Res() res): Promise<void> {
    res.sendFile(user.photoURL, { root: 'uploads' });
  }
}
