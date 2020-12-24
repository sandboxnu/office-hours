import {
  DesktopNotifPartial,
  GetProfileResponse,
  UpdateProfileParams,
} from '@koh/common';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { pick } from 'lodash';
import { memoryStorage } from 'multer';
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
      storage: memoryStorage(),
    }),
  )
  async uploadImage(
    @UploadedFile() file,
    @User() user: UserModel,
  ): Promise<void> {
    console.log('ligma', file.buffer);
    return;

    if (user.photoURL) {
      fs.unlink(process.env.UPLOAD_LOCATION + '/' + user.photoURL, (err) => {
        console.error(
          'Error deleting previous picture at: ',
          user.photoURL,
          err,
          'the previous image was at an invalid location?',
        );
      });
    }

    user.photoURL = file.filename;
    await user.save();
  }

  @Get('/get_picture/:photoURL')
  async getImage(
    @Param('photoURL') photoURL: string,
    @User() user: UserModel,
    @Res() res: Response,
  ): Promise<void> {
    if (fs.existsSync(process.env.UPLOAD_LOCATION + '/' + photoURL)) {
      res.sendFile(photoURL, { root: process.env.UPLOAD_LOCATION });
    } else {
      throw new NotFoundException();
    }
  }
}
