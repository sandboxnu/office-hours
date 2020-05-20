import ical, { CalendarComponent, CalendarResponse, VEvent } from "node-ical";
import { OfficeHourModel } from "../entity/OfficeHourModel";
import { CourseModel } from "../entity/CourseModel";
import { DeepPartial } from "typeorm";

/**
 * Takes parsed information of ical file and stuffs it into an OfficeHour
 * @param icalData parsed information from ical file
 * @param course the course this ical is for
 */
export async function parseIcal(
  icalData: CalendarResponse,
  courseId: number
): Promise<DeepPartial<OfficeHourModel>[]> {
  const icalDataValues: Array<CalendarComponent> = Object.values(icalData);
  const officeHours = icalDataValues.filter(
    (iCalElement): iCalElement is VEvent =>
      iCalElement.type === "VEVENT" &&
      iCalElement.start !== undefined &&
      iCalElement.end !== undefined
  );
  return officeHours.map((event) => ({
    title: event.summary,
    // course: { id: courseId },
    courseId,
    room: event.location,
    startTime: event.start,
    endTime: event.end,
  }));
}

/**
 * Updates the OfficeHours for a given Course by rescraping ical
 * @param course to parse
 */
// TODO: update url to use course model instead of url itself
export async function updateCalendarForCourse(course: CourseModel) {
  const officeHours = await parseIcal(
    await ical.fromURL(course.icalUrl),
    course.id
  );
  for (const officeHour of officeHours) {
    await OfficeHourModel.create(officeHour).save();
  }
  console.log("finished parsing ical bruv");
}
