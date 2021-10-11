import {
  DesktopNotifPartial,
  ERROR_MESSAGES,
  GetProfileResponse,
  UpdateProfileParams,
} from '@koh/common';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as checkDiskSpace from 'check-disk-space';
import { Response } from 'express';
import * as fs from 'fs';
import { pick } from 'lodash';
import { memoryStorage } from 'multer';
import * as path from 'path';
import * as sharp from 'sharp';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { NotificationService } from '../notification/notification.service';
import { User } from '../decorators/user.decorator';
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
    if (user === null || user === undefined) {
      console.error(ERROR_MESSAGES.profileController.accountNotAvailable);
      throw new HttpException(
        ERROR_MESSAGES.profileController.accountNotAvailable,
        HttpStatus.NOT_FOUND,
      );
    }

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
      'insights',
    ]);

    if (userResponse === null || userResponse === undefined) {
      console.error(ERROR_MESSAGES.profileController.userResponseNotFound);
      throw new HttpException(
        ERROR_MESSAGES.profileController.userResponseNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

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

    // check that the user is trying to update the phone notifs
    if (userPatch.phoneNotifsEnabled && userPatch.phoneNumber) {
      // only register new phone if the notifs are enables and the phone number is new
      if (
        user.phoneNotifsEnabled &&
        userPatch.phoneNumber !== user.phoneNotif?.phoneNumber
      ) {
        await this.notifService.registerPhone(userPatch.phoneNumber, user);
      }
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
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserModel,
  ): Promise<void> {
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

    const spaceLeft = await checkDiskSpace(path.parse(process.cwd()).root);

    if (spaceLeft.free < 1000000000) {
      // if less than a gigabyte left
      throw new ServiceUnavailableException(
        ERROR_MESSAGES.profileController.noDiskSpace,
      );
    }

    const fileName =
      user.id +
      '-' +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    await sharp(file.buffer)
      .resize(256)
      .toFile(path.join(process.env.UPLOAD_LOCATION, fileName));

    user.photoURL = fileName;
    await user.save();
  }

  @Get('/get_picture/:photoURL')
  async getImage(
    @Param('photoURL') photoURL: string,
    @Res() res: Response,
  ): Promise<void> {
    fs.stat(
      path.join(process.env.UPLOAD_LOCATION, photoURL),
      async (err, stats) => {
        if (stats) {
          res.sendFile(photoURL, { root: process.env.UPLOAD_LOCATION });
        } else {
          const user = await UserModel.findOne({
            where: {
              photoURL,
            },
          });
          user.photoURL = null;
          await user.save();
          throw new NotFoundException();
        }
      },
    );
  }

  @Delete('/delete_profile_picture')
  async deleteProfilePicture(@User() user: UserModel): Promise<void> {
    if (user.photoURL) {
      fs.unlink(
        process.env.UPLOAD_LOCATION + '/' + user.photoURL,
        async (err) => {
          if (err) {
            const errMessage =
              'Error deleting previous picture at : ' +
              user.photoURL +
              'the previous image was at an invalid location?';
            console.error(errMessage, err);
            throw new BadRequestException(errMessage);
          } else {
            user.photoURL = null;
            await user.save();
            return;
          }
        },
      );
    }
  }
}
