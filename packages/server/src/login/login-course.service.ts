import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Role } from '@template/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { CourseModel } from 'course/course.entity';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';

@Injectable()
export class LoginCourseService {
  constructor(private connection: Connection) {}

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
      where: { userId, courseId, role },
    });
    if (!userCourse) {
      userCourse = await UserCourseModel.create({
        userId,
        courseId,
        role,
      }).save();
    }
    return userCourse;
  }
}
