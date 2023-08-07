/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  HttpService,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CourseModel } from '../course/course.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as checkDiskSpace from 'check-disk-space';
import { Connection } from 'typeorm';
import { RedisService } from 'nestjs-redis';
import * as Redlock from 'redlock';
import { ERROR_MESSAGES } from '@koh/common';

/**
 * Manage resources
 */
@Injectable()
export class ResourcesService {
  constructor(
    private connection: Connection,
    private httpService: HttpService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * Refetches course calendar for all active courses. Any calendar files for
   * disabled courses are deleted from disk.
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  public async refetchAllCalendarsJob(): Promise<void> {
    // const resource = 'locks:icalcron';
    // const ttl = 60000;
    // const redisDB = await this.redisService.getClient('db');
    // const redlock = new Redlock([redisDB]);
    // redlock.on('clientError', function (err) {
    //   console.error('A redis error has occurred:', err);
    // });
    // try {
    //   await redlock.lock(resource, ttl).then(async (lock) => {
    //     console.log('updating course icals');
    //     await this.refetchAllCalendars();
    //     return lock.unlock().catch(function (err) {
    //       console.error('Error unlocking Redlock:', err);
    //     });
    //   });
    //   console.log('Successfully updated course calendars');
    // } catch (error) {
    //   console.error('A problem locking Redlock has occurred:', error);
    // }
  }

  private async refetchAllCalendars(): Promise<void> {
    // delete all cal files (will also get rid of files for disabled courses)
    const regex = /calendar-\d+$/;
    fs.readdirSync(process.env.UPLOAD_LOCATION)
      .filter((f) => regex.test(f))
      .map((f) => {
        try {
          fs.unlinkSync(path.join(process.env.UPLOAD_LOCATION, f));
          console.log('Unlinked calendar file', f);
        } catch (error) {
          console.error(`Error deleting calendar file ${f}:`, error);
        }
      });

    const courses = await CourseModel.find({ where: { enabled: true } });
    await Promise.all(courses.map((c) => this.refetchCalendar(c)));
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
      (err) => {
        if (err) {
          console.error(ERROR_MESSAGES.resourcesService.saveCalError, err);
        } else {
          console.log('Saved calendar for course ', course.id);
        }
      },
    );
    return request.data;
  }

  public getCalFilename(courseId: number) {
    return `calendar-${courseId}`;
  }
}
