import {
  Controller,
  Get,
  HttpException,
  HttpService,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { ResourcesService } from './resources.service';
import { CourseModel } from '../course/course.entity';
import { ERROR_MESSAGES } from '@koh/common';

/**
 * Controller for any public resources on the app. Anything accessed through this controller does
 * not need any JWT or role guards.
 */
@Controller('resources')
export class ResourcesController {
  constructor(
    private connection: Connection,
    private httpService: HttpService,
    private resourcesService: ResourcesService,
  ) {}

  @Get('/calendar/:course/refresh=:refresh')
  async getCourseCalendar(
    @Param('course') courseId: number,
    @Param('refresh') refresh: boolean,
    @Res() res: Response,
  ): Promise<void> {
    const filename = this.resourcesService.getCalFilename(courseId);
    fs.stat(
      path.join(process.env.UPLOAD_LOCATION, filename),
      async (err, stats) => {
        if (stats && !refresh) {
          res.sendFile(filename, { root: process.env.UPLOAD_LOCATION });
        } else {
          const course = await CourseModel.findOne(courseId);
          if (course === null || course === undefined) {
            console.error(
              ERROR_MESSAGES.courseController.courseNotFound +
                'Course ID: ' +
                courseId,
            );
            throw new HttpException(
              ERROR_MESSAGES.courseController.courseNotFound,
              HttpStatus.NOT_FOUND,
            );
          }
          const cal = await this.resourcesService.refetchCalendar(course);
          res.send(cal);
        }
      },
    );
  }
}
