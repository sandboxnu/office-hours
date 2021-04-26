import { Heatmap } from '@koh/common';
import { BaseEntity } from 'typeorm';
import { EventModel } from '../profile/event-model.entity';
import { UserCourseModel } from '../profile/user-course.entity';
import { QueueModel } from '../queue/queue.entity';
import { OfficeHourModel } from './office-hour.entity';
import { SemesterModel } from '../semester/semester.entity';
import { AlertModel } from '../alerts/alerts.entity';
export declare class CourseModel extends BaseEntity {
    id: number;
    officeHours: OfficeHourModel[];
    queues: QueueModel[];
    name: string;
    coordinator_email: string;
    icalURL: string;
    userCourses: UserCourseModel;
    semester: SemesterModel;
    semesterId: number;
    enabled: boolean;
    pending: boolean;
    heatmap: Heatmap | false;
    timezone: string;
    events: EventModel[];
    alerts: AlertModel[];
}
