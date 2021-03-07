import { Injectable } from '@nestjs/common';
import 'moment-timezone';
import {
  CalendarComponent,
  CalendarResponse,
  fromURL,
  VEvent,
} from 'node-ical';
import { RRule } from 'rrule';
import { Connection, DeepPartial } from 'typeorm';
import { findOneIana } from 'windows-iana/dist';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from './course.entity';
import { OfficeHourModel } from './office-hour.entity';
import moment = require('moment');
import { Cron } from '@nestjs/schedule';
import { RedisService } from 'nestjs-redis';
import * as Redlock from 'redlock';

type Moment = moment.Moment;

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

@Injectable()
export class IcalService {
  constructor(
    private connection: Connection,
    private readonly redisService: RedisService,
  ) {}

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
      moment(date).subtract(utcOffset, 'm');
    // apply the UTC adjustment required by the rrule lib
    const preRRule = (date: Moment) => applyOffset(date, dtstartUTCOffset);
    // Revert the UTC adjustment required by the rrule lib
    const postRRule = (date: Moment) => applyOffset(date, -dtstartUTCOffset);

    // Adjust for rrule not taking into account DST in locale
    //   ie. "8pm every friday" means having to push back 60 minutes after Fall Backwards
    const fixDST = (date: Moment): Moment =>
      // Get the difference in UTC offset between dtstart and this date (so if we crossed DST switch, this will be nonzero)
      moment(date).subtract(dtstartUTCOffset - tzUTCOffsetOnDate(date), 'm');

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

  parseIcal(
    icalData: CalendarResponse,
    courseId: number,
    testRegex = /\b^(OH|Hours)\b/,
  ): CreateOfficeHour {
    const icalDataValues: Array<CalendarComponent> = Object.values(icalData);

    const officeHours = icalDataValues.filter(
      (iCalElement): iCalElement is VEvent =>
        iCalElement.type === 'VEVENT' &&
        iCalElement.start !== undefined &&
        iCalElement.end !== undefined,
    );

    const filteredOfficeHours = officeHours.filter((event) =>
      testRegex.test(event.summary),
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

    const icalURL = await fromURL(course.icalURL);

    const officeHours = this.parseIcal(icalURL, course.id);
    await OfficeHourModel.delete({ courseId: course.id });
    await OfficeHourModel.save(
      officeHours.map((e) => {
        e.queueId = queue.id;
        return OfficeHourModel.create(e);
      }),
    );

    const professorHoursRegex = /\b^(Prof|Professor)/;
    const professorOfficeHours = this.parseIcal(
      icalURL,
      course.id,
      professorHoursRegex,
    );

    // TODO: make professor queues instead of this bullshit lmao
    const professorQueues = await QueueModel.find({
      where: {
        isProfessorQueue: true,
      },
    });

    const processedProfessorOfficeHours = [];

    for (const poh of professorOfficeHours) {
      const professorLocation = poh.title;
      if (
        !professorQueues.some(
          (q) => q.room === professorLocation && q.courseId === course.id,
        )
      ) {
        const newProfQ = QueueModel.create({
          room: professorLocation,
          courseId: course.id,
          staffList: [],
          questions: [],
          allowQuestions: false,
          isProfessorQueue: true,
        });
        await newProfQ.save();
        professorQueues.push(newProfQ);
      }

      const professorQueue = professorQueues.find(
        (q) => q.room === professorLocation,
      );
      processedProfessorOfficeHours.push(
        OfficeHourModel.create({
          queueId: professorQueue.id,
          ...poh,
        }),
      );
    }

    await OfficeHourModel.save(processedProfessorOfficeHours);
    await QueueModel.save(professorQueues);

    console.timeEnd(`scrape course ${course.id}`);
    console.log('done scraping!');
  }

  @Cron('51 0 * * *')
  public async updateAllCourses(): Promise<void> {
    let resource = 'locks:icalcron';
    let ttl = 60000;

    const redisDB = await this.redisService.getClient('db');

    let redlock = new Redlock([redisDB], {
      // the expected clock drift; for more details
      // see http://redis.io/topics/distlock
      driftFactor: 0.01, // multiplied by lock ttl to determine drift time

      // the max number of times Redlock will attempt
      // to lock a resource before erroring
      retryCount: 10,

      // the time in ms between attempts
      retryDelay: 200, // time in ms

      // the max time in ms randomly added to retries
      // to improve performance under high contention
      // see https://www.awsarchitectureblog.com/2015/03/backoff.html
      retryJitter: 200, // time in ms
    });

    redlock.on('clientError', function (err) {
      console.error('A redis error has occurred:', err);
    });

    await redlock.lock(resource, ttl).then(async (lock) => {
      console.log('updating course icals');
      const courses = await CourseModel.find();
      await Promise.all(courses.map((c) => this.updateCalendarForCourse(c)));

      return lock.unlock().catch(function (err) {
        // we weren't able to reach redis; your lock will eventually
        // expire, but you probably want to log this error
        console.error(err);
      });
    });
  }
}
