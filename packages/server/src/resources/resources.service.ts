import {
  Injectable,
  HttpService,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CourseModel } from '../course/course.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as checkDiskSpace from 'check-disk-space';
import { Connection } from 'typeorm';
import { ERROR_MESSAGES } from '@koh/common';

/**
 * Manage resources
 */
@Injectable()
export class ResourcesService {
  constructor(
    private connection: Connection,
    private httpService: HttpService,
  ) {}
  /**
   * TODO: write cron job to refetch file at midnight
   * if course is disabled, delete the file
   * test ical editing+refresh
   */
  // cron job needs to get all active courses and refresh
  // remaining untouched fnames (that start w calendar-) can be deleted

  /**
   * Refetches course calendar for all active courses. Any calendar files for
   * disabled courses are deleted from disk.
   */
  @Cron('51 0 * * *') // at 00:51 each day
  public async refetchAllCalendars(): Promise<void> {
    // delete all cal files (will also get rid of files for disabled courses)
    const regex = /calendar-\d+$/;
    fs.readdirSync(process.env.UPLOAD_LOCATION)
      .filter(f => regex.test(f))
      .map(f => fs.unlinkSync(path.join(process.env.UPLOAD_LOCATION, f)));

    const courses = await CourseModel.find({ where: { enabled: true } });
    await Promise.all(courses.map(c => this.refetchCalendar(c)));
  }

  /**
   * Fetch calendar for the given courseId, saving it to disk. Returns the string content
   * of the fetched calendar.
   */
  public async refetchCalendar(course: CourseModel): Promise<string> {
    const spaceLeft = await checkDiskSpace(path.parse(process.cwd()).root);
    if (spaceLeft.free < 1000000) {
      // less than 1000kb left (calendars range in size from 30-850kb)
      throw new ServiceUnavailableException(
        ERROR_MESSAGES.resourcesService.noDiskSpace,
      );
    }

    const request = await this.httpService.get(course.icalURL).toPromise();
    fs.writeFile(
      // not doing this synchronously so the request is faster
      path.join(process.env.UPLOAD_LOCATION, this.getCalFilename(course.id)),
      request.data,
      err => {
        if (err) {
          console.error(ERROR_MESSAGES.resourcesService.saveCalError, err);
          throw new ServiceUnavailableException(
            ERROR_MESSAGES.resourcesService.saveCalError,
          );
        }
      },
    );
    return request.data;
  }

  public getCalFilename(courseId: number) {
    return `calendar-${courseId}`;
  }
}
