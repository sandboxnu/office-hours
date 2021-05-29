import { Role } from '@koh/common';
import { BaseEntity } from 'typeorm';
import { CourseModel } from '../course/course.entity';
import { UserModel } from './user.entity';
export declare class UserCourseModel extends BaseEntity {
    id: number;
    user: UserModel;
    userId: number;
    course: CourseModel;
    courseId: number;
    role: Role;
    override: boolean;
    expires: boolean;
}
