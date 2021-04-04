import { AlertPayload, AlertType } from '@koh/common';
import { BaseEntity } from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from '../profile/user.entity';
export declare class AlertModel extends BaseEntity {
    id: number;
    alertType: AlertType;
    sent: Date;
    resolved: Date;
    user: UserModel;
    userId: number;
    course: CourseModel;
    courseId: number;
    payload: AlertPayload;
}
