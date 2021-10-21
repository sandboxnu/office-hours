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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Cron } from '@nestjs/schedule';
import { RedisService } from 'nestjs-redis';
import * as Redlock from 'redlock';
import { SemesterModel } from '../semester/semester.entity';

type Moment = moment.Moment;

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

const ICalStartDateMap = {
  Fall: 8,
  Spring: 0,
  Summer_1: 4,
  Summer_2: 6,
  Summer_Full: 4,
};

const ICalEndDateMap = {
  Fall: 11,
  Spring: 4,
  Summer_1: 6,
  Summer_2: 8,
  Summer_Full: 8,
};
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
    startDate: Date,
    endDate: Date,
    testRegex = /\b^(Online OH)\b/,
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
      // Filter out events that occur before the current semester
      // This office hour timezone. ASSUMING every date field has same timezone as oh.start
      const eventTZ = oh.start.tz;
      const { rrule } = oh as any;
      if (rrule) {
        const duration = oh.end.getTime() - oh.start.getTime();

        const allDates = this.rruleToDates(rrule, eventTZ, oh.exdate);
        const generatedOfficeHours = allDates
          .filter((date) => date >= startDate && date <= endDate)
          .map((date) => ({
            title: oh.summary,
            courseId: courseId,
            room: oh.location,
            startTime: date,
            endTime: new Date(date.getTime() + duration),
          }));
        //console.log("+ "+generatedOfficeHours.length);
        resultOfficeHours = resultOfficeHours.concat(generatedOfficeHours);
      } else {
        const startTime = this.fixOutlookTZ(moment(oh.start), eventTZ).toDate();
        if (startTime >= startDate && startTime <= endDate) {
          resultOfficeHours.push({
            title: oh.summary,
            courseId: courseId,
            room: oh.location,
            startTime: startTime,
            endTime: this.fixOutlookTZ(moment(oh.end), eventTZ).toDate(),
          });
          //console.log("+ 1");
        } else {
          //console.log("+ 0");
        }
      }
    });
    return resultOfficeHours;
  }

  private getSemEnd(sem: SemesterModel): Date {
    const month = ICalEndDateMap[sem.season];
    const year = sem.year;
    return new Date(year, month + 1, 0, 0, 0, 0, 0);
  }
  private getSemBegin(sem: SemesterModel): Date {
    const month = ICalStartDateMap[sem.season];
    const day = 1;
    const year = sem.year;
    return new Date(year, month, day, 0, 0, 0, 0);
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

    const semBegin = this.getSemBegin(course.semester);
    const semEnd = this.getSemEnd(course.semester);

    const icalURL = await fromURL(course.icalURL);

    const officeHours = this.parseIcal(icalURL, course.id, semBegin, semEnd);

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
      semBegin,
      semEnd,
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
    const resource = 'locks:icalcron';
    const ttl = 60000;

    const redisDB = await this.redisService.getClient('db');

    const redlock = new Redlock([redisDB]);

    redlock.on('clientError', function (err) {
      console.error('A redis error has occurred:', err);
    });

    try {
      await redlock.lock(resource, ttl).then(async (lock) => {
        console.log('updating course icals');
        const courses = await CourseModel.find({
          where: { enabled: true },
        });
        await Promise.all(courses.map((c) => this.updateCalendarForCourse(c)));

        return lock.unlock().catch(function (err) {
          console.error(err);
        });
      });
    } catch (error) {
      console.error('A problem locking Redlock has occurred:', error);
    }
  }
}
