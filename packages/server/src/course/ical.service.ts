import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  fromURL,
  CalendarComponent,
  CalendarResponse,
  VEvent,
  DateWithTimeZone,
} from 'node-ical';
import { DeepPartial, Connection } from 'typeorm';
import { OfficeHourModel } from './office-hour.entity';
import { CourseModel } from './course.entity';
import { QueueModel } from '../queue/queue.entity';
import { findOneIana } from 'windows-iana/dist';
import 'moment-timezone';
import moment = require('moment');

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

@Injectable()
export class IcalService {
  constructor(private connection: Connection) {}

  // If timezone is Windows, adjust it to account for the difference,
  // because node-ical doesn't handle Windows timezones
  private fixTimezone(date: DateWithTimeZone): Date {
    const iana = findOneIana(date.tz); // Get IANA timezone from windows timezone
    if (iana) {
      const mome = moment(date);
      mome.tz(iana, true); // Move date to IANA
      return mome.toDate();
    }
    return date;
  }

  parseIcal(icalData: CalendarResponse, courseId: number): CreateOfficeHour {
    const icalDataValues: Array<CalendarComponent> = Object.values(icalData);

    const officeHours = icalDataValues.filter(
      (iCalElement): iCalElement is VEvent =>
        iCalElement.type === 'VEVENT' &&
        iCalElement.start !== undefined &&
        iCalElement.end !== undefined,
    );

    const isOfficeHoursEvent = (title: string) => {
      const offficeHourKeywords = ['OH', 'Hours'];
      return offficeHourKeywords.some(keyword => title.includes(keyword));
    };

    return officeHours
      .filter(event => isOfficeHoursEvent(event.summary))
      .map(event => ({
        title: event.summary,
        courseId: courseId,
        room: event.location,
        startTime: this.fixTimezone(event.start),
        endTime: this.fixTimezone(event.end),
      }));
  }

  /**
   * Updates the OfficeHours for a given Course by rescraping ical
   * @param course to parse
   */
  public async updateCalendarForCourse(course: CourseModel): Promise<void> {
    console.log(
      `scraping ical for course "${course.name}"(${course.id} at url: ${course.icalURL}...`,
    );
    console.time(`scrape course ${course.id}`);
    let queue = await QueueModel.findOne({
      where: { courseId: course.id, room: 'Online' },
    });
    if (!queue) {
      queue = await QueueModel.create({
        room: 'Online',
        courseId: course.id,
        staffList: [],
        questions: [],
        allowQuestions: false,
      }).save();
    }

    const officeHours = this.parseIcal(
      await fromURL(course.icalURL),
      course.id,
    );
    await OfficeHourModel.delete({ courseId: course.id });
    await OfficeHourModel.save(
      officeHours.map(e => {
        e.queueId = queue.id;
        return OfficeHourModel.create(e);
      }),
    );
    console.timeEnd(`scrape course ${course.id}`);
    console.log('done scraping!');
  }

  @Cron('51 0 * * *')
  public async updateAllCourses(): Promise<void> {
    console.log('updating course icals');
    const courses = await CourseModel.find();
    await Promise.all(courses.map(c => this.updateCalendarForCourse(c)));
  }
}
