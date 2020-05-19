import ical, { CalendarComponent, CalendarResponse, VEvent } from "node-ical";
import { OfficeHourModel } from "../entity/OfficeHourModel";

/**
 * Represents an Office Hour block as assigned on the course calendar.
 * @param id - The id number of this office hour.
 * @param title - The title string of this office hour event Ex: "OH: Leena Razzaq"
 * @param course - The course this office hour supports.
 * @param room - The room string where this office hour is taking place. Ex: "RY 154"
 * @param campusId - The campus number id where this office hour takes place. Ex: 116 for Boston(?)
 * @param startTime - The date string for the start time of this office hour block. Ex: "2019-09-21T12:00:00-04:00"
 * @param endTime - The date string for the end time of this office hour block.
 */
export interface OfficeHour {
  title: string;
  course: any; //Course; this can be ignored for now
  room: string;
  campusId: number;
  startTime: number;
  endTime: number;
}

/**
 * Takes parsed information of ical file and stuffs it into an OfficeHour
 * @param icalData parsed information from ical file
 * @param course the course this ical is for
 */
export async function parseIcal(
  icalData: CalendarResponse,
  course: string
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
    course: course,
    room: event.location,
    campusId: 116, // TODO: course coordinator grabs this
    startTime: event.start.getTime() / 1000,
    endTime: event.end.getTime() / 1000,
  }));
}

/**
 * Parses an ical file.
 * @param url url which to grab ical file
 */
// TODO: update url to use course model instead of url itself
export async function updateCalendarForCourse(url: string) {
  const officeHours = await parseIcal(await ical.fromURL(url), "CS2510");
  for (const officeHour of officeHours) {
    OfficeHourModel.create(officeHour);
  }
  console.log("finished parsing ical bruv");
}
