/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserCourseModel } from 'profile/user-course.entity';
import { CourseModel } from 'course/course.entity';
import { Role } from '@koh/common';
@Injectable()
export class SignupService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteAll(model: any): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(model)
      .execute();
  }

  async insertOne(courseId: any, userId: any) {
    const role = Role.STUDENT;
    const userCourse = await UserCourseModel.create({
      userId,
      courseId,
      role,
    }).save();
    return userCourse;
  }
  async insertUserCourse(courses, userId) {
    for (var i = 0; i < courses.length; ++i) {
      const courseName = courses[i];
      const course = await CourseModel.findOne({
        where: { name: courseName },
      });
      if (!course) {
        console.log(course);
        return course;
      } else {
        const cid = course.id;
        return this.insertOne(cid, userId);
      }
    }
  }
}
