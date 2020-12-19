import { Connection } from 'typeorm';
import { KhouryDataParams, Role } from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';
export declare class LoginCourseService {
    private connection;
    constructor(connection: Connection);
    addUserFromKhoury(info: KhouryDataParams): Promise<UserModel>;
    courseSectionToCourse(couresName: string, courseSection: number): Promise<CourseModel>;
    courseToUserCourse(userId: number, courseId: number, role: Role): Promise<UserCourseModel>;
}
