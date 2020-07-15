import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import ical, { CalendarComponent, CalendarResponse, VEvent } from 'node-ical';
import { DeepPartial, Connection } from 'typeorm';
import { OfficeHourModel } from './office-hour.entity';
import { CourseModel } from './course.entity';

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
    const officeHours = this.parseIcal(
      await ical.fromURL(course.icalURL),
      course.id,
    );
    await OfficeHourModel.save(
      officeHours.map((e) => OfficeHourModel.create(e)),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async updateAllCourses(): Promise<void> {
    const courses = await CourseModel.find();
    await Promise.all(courses.map(this.updateCalendarForCourse));
  }
}
