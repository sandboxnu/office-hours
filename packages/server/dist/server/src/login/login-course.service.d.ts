import { KhouryDataParams, Role } from '@koh/common';
import { CourseModel } from 'course/course.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
import { Connection } from 'typeorm';
export declare class LoginCourseService {
    private connection;
    constructor(connection: Connection);
    addUserFromKhoury(info: KhouryDataParams): Promise<UserModel>;
    courseSectionToCourse(couresName: string, courseSection: number): Promise<CourseModel>;
    courseToUserCourse(userId: number, courseId: number, role: Role): Promise<UserCourseModel>;
}
