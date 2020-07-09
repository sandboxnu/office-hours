import { Injectable } from '@nestjs/common';
import ical, { CalendarComponent, CalendarResponse, VEvent } from 'node-ical';
import { DeepPartial, Connection } from 'typeorm';
import { OfficeHour } from './office-hour.entity';
import { Course } from './course.entity';

type CreateOfficeHour = DeepPartial<OfficeHour>[];

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
  public async updateCalendarForCourse(course: Course): Promise<void> {
    const officeHours = this.parseIcal(
      await ical.fromURL(course.icalURL),
      course.id,
    );
    await OfficeHour.save(officeHours.map((e) => OfficeHour.create(e)));
  }
}
