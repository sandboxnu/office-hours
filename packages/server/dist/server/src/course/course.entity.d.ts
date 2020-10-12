import { BaseEntity } from 'typeorm';
import { OfficeHourModel } from './office-hour.entity';
import { QueueModel } from '../queue/queue.entity';
import { UserCourseModel } from '../profile/user-course.entity';
import { SemesterModel } from './semester.entity';
export declare class CourseModel extends BaseEntity {
    id: number;
    officeHours: OfficeHourModel[];
    queues: QueueModel[];
    name: string;
    icalURL: string;
    userCourses: UserCourseModel;
    semester: SemesterModel;
    semesterId: number;
    enabled: boolean;
}
