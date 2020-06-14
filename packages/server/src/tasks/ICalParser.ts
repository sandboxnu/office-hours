import ical, { CalendarComponent, CalendarResponse, VEvent } from "node-ical";
import { OfficeHourModel } from "../entities/OfficeHourModel";
import { CourseModel } from "../entities/CourseModel";
import { DeepPartial } from "typeorm";

type CreateOfficeHour = DeepPartial<OfficeHourModel>[];

/**
 * Takes parsed information of ical file and stuffs it into a list of OfficeHourModels
 * @param icalData parsed information from ical file
 * @param courseId id of the course in the database
 */
export function parseIcal(
  icalData: CalendarResponse,
  courseId: number
): CreateOfficeHour {
  const icalDataValues: Array<CalendarComponent> = Object.values(icalData);

  const officeHours = icalDataValues.filter(
    (iCalElement): iCalElement is VEvent =>
      iCalElement.type === "VEVENT" &&
      iCalElement.start !== undefined &&
      iCalElement.end !== undefined
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
export async function updateCalendarForCourse(course: CourseModel) {
  const officeHours = parseIcal(await ical.fromURL(course.icalUrl), course.id);
  await OfficeHourModel.save(officeHours.map((e) => OfficeHourModel.create(e)));
}

// TODO: add soemthign that will craete room table
