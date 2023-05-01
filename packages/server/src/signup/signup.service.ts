/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserCourseModel } from 'profile/user-course.entity';
import { CourseModel } from 'course/course.entity';
import { Role } from '@koh/common';
import { UserModel } from 'profile/user.entity';
@Injectable()
export class SignupService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteAll(model: any): Promise<void> {
    await getConnection().createQueryBuilder().delete().from(model).execute();
  }

  async insertOne(courseId: any, user: UserModel) {
    const role = Role.STUDENT;
    const userCourse = await UserCourseModel.create({
      user,
      courseId,
      role,
    }).save();
    return userCourse;
  }
  async insertUserCourse(c: CourseModel, user: UserModel) {
    const userCourse = await UserCourseModel.create({
      user: user,
      course: c,
      role: Role.STUDENT,
    }).save();
    const UserCoursesInUser = user.courses;
    UserCoursesInUser.push(userCourse);
    user.courses = UserCoursesInUser;
    await user.save();
    return userCourse;
  }
}
