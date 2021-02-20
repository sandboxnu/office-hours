import { KhouryDataParams, Role } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { CourseModel } from 'course/course.entity';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class LoginCourseService {
  constructor(private connection: Connection) {}

  public async addUserFromKhoury(info: KhouryDataParams): Promise<UserModel> {
    let user: UserModel;
    const neuEmail = info.email.replace('@husky.neu.edu', '@northeastern.edu');
    user = await UserModel.findOne({
      where: { email: neuEmail },
      relations: ['courses', 'courses.course'],
    });

    if (!user) {
      user = UserModel.create({
        courses: [],
        email: neuEmail,
        firstName: info.first_name,
        lastName: info.last_name,
      });
    }

    const userCourses = [];

    for (const c of info.courses) {
      const course: CourseModel = await this.courseSectionToCourse(
        c.course,
        c.section,
      );

      if (course) {
        const userCourse = await this.courseToUserCourse(
          user.id,
          course.id,
          Role.STUDENT,
        );
        userCourses.push(userCourse);
      }
    }

    for (const c of info.ta_courses) {
      // Query for all the courses which match the name of the generic course from Khoury
      const courseMappings = await CourseSectionMappingModel.find({
        where: { genericCourseName: c.course }, // TODO: Add semester support
      });

      for (const courseMapping of courseMappings) {
        const taCourse = await this.courseToUserCourse(
          user.id,
          courseMapping.courseId,
          c.instructor === 1 ? Role.PROFESSOR : Role.TA,
        );
        userCourses.push(taCourse);
      }
    }

    // Delete "stale" user courses
    for (const previousCourse of user.courses) {
      if (
        !this.hasUserCourse(userCourses, previousCourse) &&
        previousCourse.course.enabled
      ) {
        if (!previousCourse.override) {
          previousCourse.remove();
        } else {
          userCourses.push(previousCourse);
        }
      }
    }

    user.courses = userCourses;
    await user.save();
    return user;
  }

  public async courseSectionToCourse(
    couresName: string,
    courseSection: number,
  ): Promise<CourseModel> {
    const courseSectionModel = await CourseSectionMappingModel.findOne({
      where: { genericCourseName: couresName, section: courseSection },
      relations: ['course'],
    });
    return courseSectionModel?.course;
  }

  public async courseToUserCourse(
    userId: number,
    courseId: number,
    role: Role,
  ): Promise<UserCourseModel> {
    let userCourse: UserCourseModel;
    userCourse = await UserCourseModel.findOne({
      where: { userId, courseId },
    });
    if (userCourse && userCourse.override && userCourse.role === role) {
      userCourse.override = false;
      await userCourse.save();
    }
    if (!userCourse) {
      userCourse = await UserCourseModel.create({
        userId,
        courseId,
        role,
      }).save();
    }
    return userCourse;
  }

  private hasUserCourse(
    userCourses: UserCourseModel[],
    previousCourse: UserCourseModel,
  ): boolean {
    return userCourses.some(
      (uc) =>
        uc.courseId === previousCourse.courseId &&
        uc.userId === previousCourse.userId &&
        uc.role === previousCourse.role,
    );
  }
}
