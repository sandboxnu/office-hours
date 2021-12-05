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
        hideInsights: [],
      });
    }

    const userCourses = [];

    for (const c of info.courses) {
      const course: CourseModel = await this.courseCRNToCourse(c.crn);

      if (course) {
        const userCourse = await this.courseToUserCourse(
          user.id,
          course.id,
          c.role,
        );
        userCourses.push(userCourse);
      }
    }

    if (info.prof_courses) {
      // loop through section groups
      for (const c of info.prof_courses) {
        // loop through CRNs to create courses
        for (const courseCRN of c.crns) {
          const courseMappings = (
            await CourseSectionMappingModel.find({
              where: { crn: courseCRN }, // TODO: Add semester support
              relations: ['course'],
            })
          ).filter((cm) => cm.course.enabled);

          for (const courseMapping of courseMappings) {
            const profCourse = await this.courseToUserCourse(
              user.id,
              courseMapping.courseId,
              Role.PROFESSOR,
            );
            userCourses.push(profCourse);
          }
        }
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

  public async courseCRNToCourse(courseCRN: number): Promise<CourseModel> {
    const courseSectionModel = (
      await CourseSectionMappingModel.find({
        where: { crn: courseCRN },
        relations: ['course'],
      })
    ).find((cm) => cm.course.enabled);

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

  private convertKhouryRole(khouryRole: 'TA' | 'Student'): Role {
    return khouryRole.toLowerCase() === 'ta' ? Role.TA : Role.STUDENT;
  }
}
