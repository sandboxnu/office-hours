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
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { DateTime } from 'luxon';

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
      const nonOfficeHourKeywords = ['Lecture', 'Lab', 'Exam', 'Class'];
      return nonOfficeHourKeywords.every((keyword) => !title.includes(keyword));
    };

    const filteredOfficeHours = officeHours.filter((event) =>
      isOfficeHoursEvent(event.summary),
    );

    let resultOfficeHours = [];

    console.log(
      officeHours.find((oh) => oh.summary.includes('OH-Cole Stansbury')).rrule,
    );

    filteredOfficeHours.forEach((oh) => {
      if (oh.rrule) {
        // Attempt at fixing time zone issues
        // const offset = moment.tz
        //   .zone(oh.start.tz)
        //   .utcOffset(oh.start.getTime());
        // oh.rrule.options.dtstart.setMinutes(
        //   oh.rrule.options.dtstart.getMinutes() - offset,
        // );

        const rule = new RRule(oh.rrule.options);
        const allDates = rule.all();
        // Use Luxon, not necessary though?
        // .map(date =>
        //   DateTime.fromJSDate(date)
        //     .toUTC()
        //     .setZone('local', { keepLocalTime: true })
        //     .toJSDate(),
        // );

        console.log(oh.summary, allDates[0]);
        console.log(
          oh.summary + ' start',
          oh.start + ' | ' + oh.rrule.options.dtstart,
        );

        const start = this.fixTimezone(oh.start);
        const end = this.fixTimezone(oh.end);
        const duration = Math.abs(end.getTime() - start.getTime());

        const generatedOfficeHours = allDates.map((date) => ({
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
          startTime: this.fixTimezone(oh.start),
          endTime: this.fixTimezone(oh.end),
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
      officeHours.map((e) => {
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
    await Promise.all(courses.map((c) => this.updateCalendarForCourse(c)));
  }
}
