import {
  DesktopNotifPartial,
  ERROR_MESSAGES,
  GetProfileResponse,
  QuestionStatusKeys,
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
import { ProfileService } from './profile.service';
import { UserCourseModel } from './user-course.entity';
import { Role } from '@koh/common';
import { throwError } from 'rxjs';
import { QuestionModel } from 'question/question.entity';
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private connection: Connection,
    private notifService: NotificationService,
    private profileService: ProfileService,
  ) {}

  //potential problem-should fix later. Currently checking whether question in database, but student can be in different queues(so find with both queues and user id)
  @Get(':c/id')
  async getAllStudents(
    @Param('c') c: number,
    @Res() res: Response,
  ): Promise<any> {
    const studentIds = await UserCourseModel.find({
      where: {
        courseId: c,
        role: Role.STUDENT,
      },
    });
    const students = [];
    studentIds.forEach((userCourse, i) => {
      const tempId = userCourse.userId;
      UserModel.findOne({
        where: {
          id: userCourse.userId,
        },
      })
        .then(function (result) {
          students.push({ value: result.name, id: tempId });
          if (i + 1 === studentIds.length) {
            res.status(200).send(students);
            return students;
          }
        })
        .catch((e) => {
          console.error(e);
        });
    });
  }
  @Get(':id/inQueue')
  async inQueue(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<boolean> {
    const questions = await QuestionModel.find({
      where: {
        creatorId: id,
      },
    });
    if (!questions) {
      throwError;
    }
    for (let i = 0; i < questions.length; i++) {
      if (questions[i]?.status === QuestionStatusKeys.Queued) {
        console.log(questions[i].status);
        console.log(QuestionStatusKeys.Queued);
        res.status(200).send(true);
        return true;
      }
    }
    res.status(200).send(false);
    return false;
  }

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
      'sid',
      'firstName',
      'lastName',
      'photoURL',
      'defaultMessage',
      'includeDefaultMessage',
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

    const pendingCourses = await this.profileService.getPendingCourses(user.id);

    return {
      ...userResponse,
      courses,
      phoneNumber: user.phoneNotif?.phoneNumber,
      desktopNotifs,
      pendingCourses,
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
