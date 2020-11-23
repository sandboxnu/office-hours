import { BaseEntity } from 'typeorm';
import { EventModel } from '../profile/event-model.entity';
import { UserCourseModel } from '../profile/user-course.entity';
import { QueueModel } from '../queue/queue.entity';
import { OfficeHourModel } from './office-hour.entity';
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
    events: EventModel[];
}
