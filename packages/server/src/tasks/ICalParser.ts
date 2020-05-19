import ical, { CalendarComponent, CalendarResponse, VEvent } from "node-ical";
import { OfficeHourModel } from "../entity/OfficeHourModel";
import { CourseModel } from "../entity/CourseModel";

/**
 * Represents an Office Hour block as assigned on the course calendar.
 * @param id - The id number of this office hour.
 * @param title - The title string of this office hour event Ex: "OH: Leena Razzaq"
 * @param course - The course this office hour supports.
 * @param room - The room string where this office hour is taking place. Ex: "RY 154"
 * @param startTime - The date string for the start time of this office hour block. Ex: "2019-09-21T12:00:00-04:00"
 * @param endTime - The date string for the end time of this office hour block.
 */
export interface OfficeHour {
  title: string;
  course: Partial<CourseModel>;
  room: string;
  startTime: Date;
  endTime: Date;
}

/**
 * Takes parsed information of ical file and stuffs it into an OfficeHour
 * @param icalData parsed information from ical file
 * @param course the course this ical is for
 */
export async function parseIcal(
  icalData: CalendarResponse,
  courseId: number
): Promise<OfficeHour[]> {
  const icalDataValues: Array<CalendarComponent> = Object.values(icalData);
  const officeHours = icalDataValues.filter(
    (iCalElement): iCalElement is VEvent =>
      iCalElement.type === "VEVENT" &&
      iCalElement.start !== undefined &&
      iCalElement.end !== undefined
  );
  return officeHours.map((event) => ({
    title: event.summary,
    course: { id: courseId },
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
