import { KhouryCourse, KhouryDataParams, Role, Season } from '@koh/common';
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
      if (c instanceof KhouryCourse) {
        const course: CourseModel = await this.courseCRNToCourse(
          c.crn,
          c.semester,
        );

        if (course) {
          const userCourse = await this.courseToUserCourse(
            user.id,
            course.id,
            this.convertKhouryRole(c.role),
          );
          userCourses.push(userCourse);
        }
      } else {
        // c is a KhouryProfCourse
        // only need to inspect one of the CRNs from the list
        // b/c they should all map to the same section group
        if (c.crns.length !== 0) {
          const courseCRN = c.crns[0];
          const profCourse = await this.courseCRNToCourse(
            courseCRN,
            c.semester,
          );

          const profUserCourse = await this.courseToUserCourse(
            user.id,
            profCourse.id,
            Role.PROFESSOR,
          );
          userCourses.push(profUserCourse);
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

  public async courseCRNToCourse(
    courseCRN: number,
    semester: string,
  ): Promise<CourseModel> {
    const { season, year } = this.parseKhourySemester(semester);
    const courseSectionModel =
      await CourseSectionMappingModel.createQueryBuilder('section_mapping')
        .leftJoinAndSelect('section_mapping.course', 'course')
        .leftJoinAndSelect('course.semester', 'semester')
        .where(
          'section_mapping.crn = :courseCRN and semester.season = :season and semester.year = :year',
          { courseCRN, season, year },
        )
        .getOne();

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

  // util functions for converting Khoury Admin data to KOH data
  private convertKhouryRole(khouryRole: 'TA' | 'Student'): Role {
    return khouryRole.toLowerCase() === 'ta' ? Role.TA : Role.STUDENT;
  }

  private parseKhourySemester(khourySemester: string): {
    season: Season;
    year: number;
  } {
    // parsing time
    const year = Number(`20${khourySemester.slice(-2)}`);
    const season = this.parseKhourySeason(
      khourySemester.slice(khourySemester.length - 2),
    );

    return { season, year };
  }

  private parseKhourySeason(khourySeason: string): Season {
    let season = khourySeason;
    switch (
      khourySeason // summer sems are the only ones that are diff
    ) {
      case 'Summer I':
        season = 'Summer_1';
        break;
      case 'Summer II':
        season = 'Summer_2';
        break;
    }
    return season as Season;
  }
}
