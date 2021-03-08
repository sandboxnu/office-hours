import 'moment-timezone';
import { CalendarResponse } from 'node-ical';
import { Connection, DeepPartial } from 'typeorm';
import { CourseModel } from './course.entity';
import { OfficeHourModel } from './office-hour.entity';
import { RedisService } from 'nestjs-redis';
declare type CreateOfficeHour = DeepPartial<OfficeHourModel>[];
export declare class IcalService {
    private connection;
    private readonly redisService;
    constructor(connection: Connection, redisService: RedisService);
    private fixOutlookTZ;
    private rruleToDates;
    parseIcal(icalData: CalendarResponse, courseId: number, testRegex?: RegExp): CreateOfficeHour;
    updateCalendarForCourse(course: CourseModel): Promise<void>;
    updateAllCourses(): Promise<void>;
}
export {};
