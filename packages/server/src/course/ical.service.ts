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
    const serveroffset = moment.tz
      .zone(moment.tz.guess())
      .utcOffset(date.getTime()); //date.getTimezoneOffset();
    const mome = moment(date);
    if (iana) {
      // if windows timezone
      mome.subtract(serveroffset - eventoffset, 'minutes');
    }
    return mome.toDate();
  }

  // If IANA, just return, else convert windows timezone to IANA
  private ensureIana(tz: string): string {
    return findOneIana(tz) || tz;
  }

  parseIcal(icalData: CalendarResponse, courseId: number): CreateOfficeHour {
    const icalDataValues: Array<CalendarComponent> = Object.values(icalData);

    const officeHours = icalDataValues.filter(
      (iCalElement): iCalElement is VEvent =>
        iCalElement.type === 'VEVENT' &&
        iCalElement.start !== undefined &&
        iCalElement.end !== undefined,
    );

    const officeHoursEventRegex = /\b^(OH|Hours)\b/;

    const filteredOfficeHours = officeHours.filter((event) =>
      officeHoursEventRegex.test(event.summary),
    );

    let resultOfficeHours = [];

    filteredOfficeHours.forEach((oh: VEvent) => {
      // This office hour timezone. ASSUMING every date field has same timezone as oh.start
      const eventTZ = oh.start.tz;
      const { rrule } = oh as any;
      if (rrule) {
        const { options } = rrule;
        const dtstart: Date = this.fixTimezone(options.dtstart, eventTZ);
        const until: Date =
          options.until && this.fixTimezone(options.until, eventTZ);
        const eventTZMoment = moment.tz.zone(this.ensureIana(eventTZ));
        const dtstartUTCOffset = eventTZMoment.utcOffset(dtstart.getTime());

        const toUTC = (date: Date): Date =>
          moment(date).subtract(dtstartUTCOffset, 'minutes').toDate();
        const undoUTC = (date: number): moment.Moment =>
          moment(date).add(dtstartUTCOffset, 'minutes');

        const rule = new RRule({
          freq: options.freq,
          interval: options.interval,
          wkst: options.wkst,
          count: options.count,
          byweekday: options.byweekday,
          dtstart: toUTC(dtstart),
          until:
            until &&
            moment(until)
              .subtract(eventTZMoment.utcOffset(until.getTime()), 'minutes')
              .toDate(),
        });

        // Dates to exclude from recurrence, separate exdate ISOStrings for filtering
        const exdates: string[] = Object.values(
          oh.exdate || [],
        ).map((d: Date) => toUTC(this.fixTimezone(d, eventTZ)).toISOString());

        // Doing math here because moment.add changes behavior based on server timezone
        const in10Weeks = new Date(
          dtstart.getTime() + 1000 * 60 * 60 * 24 * 7 * 10,
        );
        const allDates = rule
          .all((d) => !!until || d < in10Weeks)
          .filter((date) => !exdates.includes(date.toISOString()));

        const duration = oh.end.getTime() - oh.start.getTime();

        const fixDST = (date: moment.Moment) =>
          date
            .subtract(
              dtstartUTCOffset - eventTZMoment.utcOffset(date.valueOf()),
              'minutes',
            )
            .toDate();

        const generatedOfficeHours = allDates.map((date) => ({
          title: oh.summary,
          courseId: courseId,
          room: oh.location,
          startTime: fixDST(undoUTC(date.getTime())),
          endTime: fixDST(undoUTC(date.getTime() + duration)),
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
