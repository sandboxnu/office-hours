import { Connection } from 'typeorm';
import { Role } from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { CourseModel } from 'course/course.entity';
export declare class LoginCourseService {
    private connection;
    constructor(connection: Connection);
    courseSectionToCourse(couresName: string, courseSection: number): Promise<CourseModel>;
    courseToUserCourse(userId: number, courseId: number, role: Role): Promise<UserCourseModel>;
}
