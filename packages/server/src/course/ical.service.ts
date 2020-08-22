import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

@Injectable()
export class IcalService {
  constructor(private connection: Connection) {}

  parseIcal(icalData: CalendarResponse, courseId: number): CreateOfficeHour {
    const icalDataValues: Array<CalendarComponent> = Object.values(icalData);

    const officeHours = icalDataValues.filter(
      (iCalElement): iCalElement is VEvent =>
        iCalElement.type === 'VEVENT' &&
        iCalElement.start !== undefined &&
        iCalElement.end !== undefined,
    );

    return officeHours.map((event) => ({
      title: event.summary,
      courseId: courseId,
      room: event.location,
      startTime: event.start,
      endTime: event.end,
    }));
  }

  /**
   * Updates the OfficeHours for a given Course by rescraping ical
   * @param course to parse
   */
  public async updateCalendarForCourse(course: CourseModel): Promise<void> {
    let queue = await QueueModel.findOne({
      where: { courseId: course.id, room: 'Online' },
    });
    if (!queue) {
      queue = await QueueModel.create({
        room: 'Online',
        courseId: course.id,
        staffList: [],
        questions: [],
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
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async updateAllCourses(): Promise<void> {
    const courses = await CourseModel.find();
    await Promise.all(courses.map(this.updateCalendarForCourse));
  }
}
