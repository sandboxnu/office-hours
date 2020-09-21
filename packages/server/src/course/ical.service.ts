import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  fromURL,
  CalendarComponent,
  CalendarResponse,
  VEvent,
} from 'node-ical';
import { DeepPartial, Connection } from 'typeorm';
import { OfficeHourModel } from './office-hour.entity';
import { CourseModel } from './course.entity';
import { QueueModel } from '../queue/queue.entity';
import { findOneIana } from 'windows-iana/dist';
import 'moment-timezone';
import moment = require('moment');
import { RRule } from 'rrule';

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

@Injectable()
export class IcalService {
  constructor(private connection: Connection) {}

  // tz should not be preconverted by findOneIana
  private fixTimezone(date: Date, tz: string): Date {
    if (!tz) {
      return date;
    }
    const iana = findOneIana(tz); // Get IANA timezone from windows timezone

    const eventoffset = moment.tz.zone(iana || tz).utcOffset(date.getTime());
    const serveroffset = date.getTimezoneOffset();
    const mome = moment(date);
    if (iana) {
      mome.subtract(serveroffset-eventoffset, 'minutes');
    } 
    return mome.toDate();
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
      const nonOfficeHourKeywords = ['Lecture', 'Lab', 'Exam', 'Class'];
      return nonOfficeHourKeywords.every(keyword => !title.includes(keyword));
    };

    const filteredOfficeHours = officeHours.filter(event =>
      isOfficeHoursEvent(event.summary),
    );

    let resultOfficeHours = [];

    filteredOfficeHours.forEach((oh: VEvent) => {
      // This office hour timezone. ASSUMING every date field has same timezone as oh.start
      const eventTZ = oh.start.tz;
      const { rrule } = oh as any;
      if (rrule) {
        const { options } = rrule;
        const dtstart = this.fixTimezone(options.dtstart, eventTZ);
        const until = this.fixTimezone(options.until, eventTZ);

        const rule = new RRule({
          freq: options.freq,
          interval: options.interval,
          wkst: options.wkst,
          count: options.count,
          dtstart: dtstart,
          until: until,
        });
        const allDates = rule.all();

        const duration = oh.end.getTime() - oh.start.getTime();

        const generatedOfficeHours = allDates.map(date => ({
          title: oh.summary,
          courseId: courseId,
          room: oh.location,
          startTime: date,
          endTime: new Date(date.getTime() + duration),
        }));
        resultOfficeHours = resultOfficeHours.concat(generatedOfficeHours);
      } else {
        resultOfficeHours.push({
          title: oh.summary,
          courseId: courseId,
          room: oh.location,
          startTime: this.fixTimezone(oh.start, eventTZ),
          endTime: this.fixTimezone(oh.end, eventTZ),
        });
      }
    });
    return resultOfficeHours;
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
