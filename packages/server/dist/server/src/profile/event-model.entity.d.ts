import { BaseEntity } from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from './user.entity';
export declare enum EventType {
    TA_CHECKED_IN = "taCheckedIn",
    TA_CHECKED_OUT = "taCheckedOut"
}
export declare class EventModel extends BaseEntity {
    id: number;
    time: Date;
    eventType: EventType;
    user: UserModel;
    userId: number;
    course: CourseModel;
    courseId: number;
}
