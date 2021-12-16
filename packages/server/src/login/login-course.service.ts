import { isKhouryCourse, KhouryDataParams, Role, Season } from '@koh/common';
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
      if (isKhouryCourse(c)) {
        const course = await this.courseCRNToCourse(c.crn, c.semester);

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

          if (profCourse) {
            const profUserCourse = await this.courseToUserCourse(
              user.id,
              profCourse.id,
              Role.PROFESSOR,
            );
            userCourses.push(profUserCourse);
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

  public async courseCRNToCourse(
    courseCRN: number,
    semester: string, // 6-digit semester code
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

  // parses 6-digit semester code, where first 4 digits represent year and last 2 digits represent academic semester (ex: 202110)
  private parseKhourySemester(khourySemester: string): {
    season: Season;
    year: number;
  } {
    const courseSeasonMap = {
      '10': 'Fall',
      '30': 'Spring',
      '40': 'Summer_1',
      '50': 'Summer_Full',
      '60': 'Summer_2',
    };
    // parsing time
    let year = Number(khourySemester.slice(0, 4));
    const season = courseSeasonMap[khourySemester.slice(-2)];
    // edge case for Fall semester
    if (season == 'Fall') {
      year--;
    }
    return { season, year };
  }
}
