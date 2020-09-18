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
import { pick } from 'lodash';

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

@Injectable()
export class IcalService {
  constructor(private connection: Connection) {}

  // tz should not be preconverted by findOneIana
  private fixTimezone(date: Date, tz: string): Date {
    const iana = findOneIana(tz); // Get IANA timezone from windows timezone
    if (iana) {
      // If iana is not null, timezone was in Windows, so adjust it to account for the difference,
      // because node-ical doesn't handle Windows timezones
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
      return nonOfficeHourKeywords.every(keyword => !title.includes(keyword));
    };

    const filteredOfficeHours = officeHours.filter(event =>
      isOfficeHoursEvent(event.summary),
    );

    let resultOfficeHours = [];

    // console.log(
    //   officeHours.find((oh) => oh.summary.includes('OH-Cole Stansbury')).rrule,
    // );

    filteredOfficeHours.forEach(oh => {
      // This office hour timezone. ASSUMING every date field has same timezone as oh.start
      const eventTZ = oh.start.tz;
      // Minutes of offset between server timezone to calendar event timezone
      const offset =
        moment.tz
          .zone(findOneIana(eventTZ) || eventTZ)
          .utcOffset(oh.start.getTime()) - new Date().getTimezoneOffset();
      console.log('offset', offset);
      if (oh.rrule) {
        const { options } = oh.rrule;
        const dtstart = this.fixTimezone(options.dtstart, eventTZ);
        const until = this.fixTimezone(options.until, eventTZ);
        dtstart.setMinutes(dtstart.getMinutes() - offset);
        until.setMinutes(until.getMinutes() - offset);
        console.log('dtstart', dtstart);

        const rule = new RRule({
          freq: options.freq,
          interval: options.interval,
          wkst: options.wkst,
          count: options.count,
          dtstart: dtstart,
          until: until,
        });
        const allDates = rule.all();

        console.log(oh.summary, allDates[0]);
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
        console.log(oh.summary, offset);
        oh.start.setMinutes(oh.start.getMinutes() - offset);
        oh.end.setMinutes(oh.end.getMinutes() - offset);
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
