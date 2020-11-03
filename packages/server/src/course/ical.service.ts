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
import { apply } from 'async';

type Moment = moment.Moment;

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

@Injectable()
export class IcalService {
  constructor(private connection: Connection) {}

  // tz should not be preconverted by findOneIana
  private fixOutlookTZ(date: Moment, tz: string): Moment {
    const iana = findOneIana(tz); // Get IANA timezone from windows timezone
    if (iana) {
      // Move to the timezone because node-ical didn't do it for us, since it does not recognize windows timezone
      return moment(date).tz(iana, true);
    } else {
      return date;
    }
  }

  // Generate date of occurences for an rrule in the given timezone, excluding the list of dates
  private rruleToDates(rrule: any, eventTZ: string, exdateRaw: Date[]): Date[] {
    const { options } = rrule;
    const dtstart: Moment = this.fixOutlookTZ(moment(options.dtstart), eventTZ);
    const until: Moment =
      options.until && this.fixOutlookTZ(moment(options.until), eventTZ);
    const eventTZMoment = moment.tz.zone(findOneIana(eventTZ) || eventTZ);

    // Get the UTC Offset in this event's timezone, at this time. Accounts for Daylight Savings and other oddities
    const tzUTCOffsetOnDate = (date: Moment) =>
      eventTZMoment.utcOffset(date.valueOf());
    const dtstartUTCOffset = tzUTCOffsetOnDate(dtstart);

    // Apply a UTC offset in minutes to the given Moment
    const applyOffset = (date: Moment, utcOffset: number): Moment =>
      moment(date).subtract(utcOffset, 'minutes');
    // apply the UTC adjustment required by the rrule lib
    const preRRule = (date: Moment) => applyOffset(date, dtstartUTCOffset);
    // Revert the UTC adjustment required by the rrule lib
    const postRRule = (date: Moment) => applyOffset(date, -dtstartUTCOffset);

    // Adjust for rrule not taking into account DST in locale
    //   ie. "8pm every friday" means having to push back 60 minutes after Fall Backwards
    const fixDST = (date: Moment): Moment =>
      moment(date).subtract(
        // Get the difference in UTC offset between dtstart and this date (so if we crossed DST switch, this will be nonzero)
        dtstartUTCOffset - tzUTCOffsetOnDate(date),
        'minutes',
      );

    const rule = new RRule({
      freq: options.freq,
      interval: options.interval,
      wkst: options.wkst,
      count: options.count,
      byweekday: options.byweekday,
      dtstart: preRRule(dtstart).toDate(),
      until: until && preRRule(until).toDate(),
    });

    // Dates to exclude from recurrence, separate exdate timestamp for filtering
    const exdates: number[] = Object.values(exdateRaw || {})
      .map((d) => this.fixOutlookTZ(moment(d), eventTZ))
      .map((d) => applyOffset(d, tzUTCOffsetOnDate(d)).valueOf());

    // Doing math here because moment.add changes behavior based on server timezone
    const in10Weeks = new Date(
      dtstart.valueOf() + 1000 * 60 * 60 * 24 * 7 * 10,
    );
    return rule
      .all((d) => !!until || d < in10Weeks)
      .filter((date) => !exdates.includes(date.getTime()))
      .map((d) => fixDST(postRRule(moment(d))).toDate());
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
        const duration = oh.end.getTime() - oh.start.getTime();

        const allDates = this.rruleToDates(rrule, eventTZ, oh.exdate);
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
          startTime: this.fixOutlookTZ(moment(oh.start), eventTZ).toDate(),
          endTime: this.fixOutlookTZ(moment(oh.end), eventTZ).toDate(),
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
