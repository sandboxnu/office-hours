import { CalendarResponse } from 'node-ical';
import { DeepPartial, Connection } from 'typeorm';
import { OfficeHourModel } from './office-hour.entity';
import { CourseModel } from './course.entity';
import 'moment-timezone';
declare type CreateOfficeHour = DeepPartial<OfficeHourModel>[];
export declare class IcalService {
    private connection;
    constructor(connection: Connection);
    private fixOutlookTZ;
    private rruleToDates;
    parseIcal(icalData: CalendarResponse, courseId: number): CreateOfficeHour;
    updateCalendarForCourse(course: CourseModel): Promise<void>;
    updateAllCourses(): Promise<void>;
}
export {};
