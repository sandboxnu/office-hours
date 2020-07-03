import ical, { CalendarComponent, CalendarResponse, VEvent } from "node-ical";
import { OfficeHour } from "../../../nest-server/src/course/office-hour.entity";
import { Course } from "../../../nest-server/src/course/course.entity";
import { DeepPartial } from "typeorm";

type CreateOfficeHour = DeepPartial<OfficeHour>[];

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
export async function updateCalendarForCourse(course: Course) {
  const officeHours = parseIcal(await ical.fromURL(course.icalURL), course.id);
  await OfficeHour.save(officeHours.map((e) => OfficeHour.create(e)));
}

// TODO: add soemthign that will craete room table
