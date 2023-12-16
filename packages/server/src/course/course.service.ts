import {
  ERROR_MESSAGES,
  TACheckinPair,
  TACheckinTimesResponse,
  RegisterCourseParams,
  Role,
  EditCourseInfoParams,
  GetCourseUserInfoResponse,
} from '@koh/common';
import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { partition } from 'lodash';
import { EventModel, EventType } from 'profile/event-model.entity';
import { QuestionModel } from 'question/question.entity';
import { Between, Brackets, Connection, getRepository, In } from 'typeorm';
import { UserCourseModel } from '../profile/user-course.entity';
import { SemesterModel } from 'semester/semester.entity';
import { ProfSectionGroupsModel } from 'login/prof-section-groups.entity';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';
import { LastRegistrationModel } from 'login/last-registration-model.entity';
import { LoginCourseService } from '../login/login-course.service';
import { CourseModel } from './course.entity';
import { UserModel } from 'profile/user.entity';

@Injectable()
export class CourseService {
  constructor(
    private connection: Connection,
    private loginCourseService: LoginCourseService,
  ) {}

  async getTACheckInCheckOutTimes(
    courseId: number,
    startDate: string,
    endDate: string,
  ): Promise<TACheckinTimesResponse> {
    const startDateAsDate = new Date(startDate);
    const endDateAsDate = new Date(endDate);
    if (startDateAsDate.getUTCDate() === endDateAsDate.getUTCDate()) {
      endDateAsDate.setUTCDate(endDateAsDate.getUTCDate() + 1);
    }

    const taEvents = await EventModel.find({
      where: {
        eventType: In([
          EventType.TA_CHECKED_IN,
          EventType.TA_CHECKED_OUT,
          EventType.TA_CHECKED_OUT_FORCED,
        ]),
        time: Between(startDateAsDate, endDateAsDate),
        courseId,
      },
      relations: ['user'],
    });

    const [checkinEvents, otherEvents] = partition(
      taEvents,
      (e) => e.eventType === EventType.TA_CHECKED_IN,
    );

    const taCheckinTimes: TACheckinPair[] = [];

    for (const checkinEvent of checkinEvents) {
      let closestEvent: EventModel = null;
      let mostRecentTime = new Date();
      const originalDate = mostRecentTime;

      for (const checkoutEvent of otherEvents) {
        if (
          checkoutEvent.userId === checkinEvent.userId &&
          checkoutEvent.time > checkinEvent.time &&
          checkoutEvent.time.getTime() - checkinEvent.time.getTime() <
            mostRecentTime.getTime() - checkinEvent.time.getTime()
        ) {
          closestEvent = checkoutEvent;
          mostRecentTime = checkoutEvent.time;
        }
      }

      const numHelped = await QuestionModel.count({
        where: {
          taHelpedId: checkinEvent.userId,
          helpedAt: Between(
            checkinEvent.time,
            closestEvent?.time || new Date(),
          ),
        },
      });

      taCheckinTimes.push({
        name: checkinEvent.user.name,
        checkinTime: checkinEvent.time,
        checkoutTime: closestEvent?.time,
        inProgress: mostRecentTime === originalDate,
        forced: closestEvent?.eventType === EventType.TA_CHECKED_OUT_FORCED,
        numHelped,
      });
    }

    return { taCheckinTimes };
  }

  async removeUserFromCourse(userCourse: UserCourseModel): Promise<void> {
    if (!userCourse) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseNotFound,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await UserCourseModel.remove(userCourse);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.removeCourse,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editCourse(
    courseId: number,
    coursePatch: EditCourseInfoParams,
  ): Promise<void> {
    const course = await CourseModel.findOne(courseId);
    if (course === null || course === undefined) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    if (Object.values(coursePatch).some((x) => x === null || x === '')) {
      throw new BadRequestException(
        ERROR_MESSAGES.courseController.updateCourse,
      );
    }

    for (const crn of new Set(coursePatch.crns)) {
      const courseCrnMaps = await CourseSectionMappingModel.find({
        crn: crn,
      });

      let courseCrnMapExists = false;

      for (const courseCrnMap of courseCrnMaps) {
        const conflictCourse = await CourseModel.findOne(courseCrnMap.courseId);
        if (conflictCourse && conflictCourse.semesterId === course.semesterId) {
          if (courseCrnMap.courseId !== courseId) {
            throw new BadRequestException(
              ERROR_MESSAGES.courseController.crnAlreadyRegistered(
                crn,
                courseId,
              ),
            );
          } else {
            courseCrnMapExists = true;
            break;
          }
        }
      }

      if (!courseCrnMapExists) {
        try {
          await CourseSectionMappingModel.create({
            crn: crn,
            courseId: course.id,
          }).save();
        } catch (err) {
          console.error(err);
          throw new HttpException(
            ERROR_MESSAGES.courseController.createCourseMappings,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }

    if (coursePatch.name) {
      course.name = coursePatch.name;
    }

    if (coursePatch.coordinator_email) {
      course.coordinator_email = coursePatch.coordinator_email;
    }

    if (coursePatch.icalURL) {
      course.icalURL = coursePatch.icalURL;
    }

    if (coursePatch.zoomLink) {
      course.zoomLink = coursePatch.zoomLink;
    }
    if (coursePatch.questionTimer) {
      course.questionTimer = coursePatch.questionTimer;
    }

    if (coursePatch.timezone) {
      course.timezone = coursePatch.timezone;
    }

    if (coursePatch.enabled) {
      course.enabled = coursePatch.enabled;
    }

    if (coursePatch.courseInviteCode) {
      course.courseInviteCode = coursePatch.courseInviteCode;
    }

    if (coursePatch.asyncQuestionDisplayTypes) {
      course.asyncQuestionDisplayTypes = coursePatch.asyncQuestionDisplayTypes;
    }
    try {
      await course.save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.updateCourse,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerCourses(
    body: RegisterCourseParams[],
    userId: number,
  ): Promise<void> {
    // obtains the ProfSectionGroupsModel of the professor
    const profSectionGroups = await ProfSectionGroupsModel.findOne({
      where: { profId: userId },
    });

    // iterate over each section group registration
    for (const courseParams of body) {
      // finds professor's section group with matching name
      const sectionGroup = profSectionGroups?.sectionGroups.find(
        (sg) => sg.name === courseParams.sectionGroupName,
      );
      if (!sectionGroup)
        throw new BadRequestException(
          ERROR_MESSAGES.courseController.sectionGroupNotFound,
        );
      const khourySemesterParsed = this.loginCourseService.parseKhourySemester(
        sectionGroup.semester,
      );
      const semester = await SemesterModel.findOne({
        where: {
          season: khourySemesterParsed.season,
          year: khourySemesterParsed.year,
        },
      });
      if (!semester)
        throw new BadRequestException(
          ERROR_MESSAGES.courseController.noSemesterFound,
        );

      // checks that course hasn't already been created
      let course = await CourseModel.findOne({
        where: {
          sectionGroupName: courseParams.sectionGroupName,
          semesterId: semester.id,
        },
      });
      if (course)
        throw new BadRequestException(
          ERROR_MESSAGES.courseController.courseAlreadyRegistered,
          courseParams.name,
        );

      try {
        // create the submitted course
        course = await CourseModel.create({
          name: courseParams.name,
          sectionGroupName: courseParams.sectionGroupName,
          coordinator_email: courseParams.coordinator_email,
          icalURL: courseParams.iCalURL,
          semesterId: semester.id,
          enabled: true,
          timezone: courseParams.timezone,
        }).save();
      } catch (err) {
        console.error(err);
        throw new HttpException(
          ERROR_MESSAGES.courseController.createCourse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      try {
        // create CourseSectionMappings for each crn
        new Set(sectionGroup.crns).forEach(async (crn) => {
          await CourseSectionMappingModel.create({
            crn: crn,
            courseId: course.id,
          }).save();
        });
      } catch (err) {
        console.error(err);
        throw new HttpException(
          ERROR_MESSAGES.courseController.createCourseMappings,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      // Add UserCourse to course
      await UserCourseModel.create({
        userId,
        courseId: course.id,
        role: Role.PROFESSOR,
      }).save();
    }

    try {
      // Update professor's last registered semester to semester model's current semester
      let profLastRegistered: LastRegistrationModel;
      profLastRegistered = await LastRegistrationModel.findOne({
        where: { profId: userId },
      });

      const lastRegisteredSemester =
        profSectionGroups?.sectionGroups[0]?.semester;

      if (profLastRegistered) {
        profLastRegistered.lastRegisteredSemester = lastRegisteredSemester;
        await profLastRegistered.save();
      } else {
        profLastRegistered = await LastRegistrationModel.create({
          profId: userId,
          lastRegisteredSemester,
        }).save();
      }
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.updateProfLastRegistered,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserInfo(
    courseId: number,
    page: number,
    pageSize: number,
    search?: string,
    role?: Role,
  ): Promise<GetCourseUserInfoResponse> {
    const query = await getRepository(UserModel)
      .createQueryBuilder()
      .leftJoin(
        UserCourseModel,
        'UserCourseModel',
        '"UserModel".id = "UserCourseModel"."userId"',
      )
      .where('"UserCourseModel"."courseId" = :courseId', { courseId });

    // check if searching for specific role
    if (role) {
      query.andWhere('"UserCourseModel".role = :role', { role });
    }
    // check if searching for specific name
    if (search) {
      const likeSearch = `%${search.replace(' ', '')}%`.toUpperCase();
      query.andWhere(
        new Brackets((q) => {
          q.where(
            'CONCAT(UPPER("UserModel"."firstName"), UPPER("UserModel"."lastName")) like :searchString',
            {
              searchString: likeSearch,
            },
          );
        }),
      );
    }

    // run query
    const users = query.select([
      'UserModel.id',
      'UserModel.firstName',
      'UserModel.lastName',
      'UserModel.photoURL',
      'UserModel.email',
      'UserModel.sid',
    ]);

    const total = await users.getCount();
    const usersSubset = await users
      .orderBy('UserModel.firstName')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

    return { users: usersSubset, total };
  }

  async addStudentToCourse(
    course: CourseModel,
    user: UserModel,
  ): Promise<boolean> {
    try {
      const userInCourse = await UserCourseModel.findOne({
        where: { user: user, course: course },
      });

      if (userInCourse) {
        return false;
      }

      const userCourse = await UserCourseModel.create({
        user: user,
        course: course,
        role: Role.STUDENT,
      }).save();

      const updatedUserCourse = user.courses;
      updatedUserCourse.push(userCourse);
      user.courses = updatedUserCourse;
      await user.save();

      return true;
    } catch {
      return false;
    }
  }
}
