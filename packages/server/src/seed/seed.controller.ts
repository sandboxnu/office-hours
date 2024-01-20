import { CreateQuestionParams, OrganizationRole, Role } from '@koh/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AlertModel } from 'alerts/alerts.entity';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';
import { LastRegistrationModel } from 'login/last-registration-model.entity';
import { ProfSectionGroupsModel } from 'login/prof-section-groups.entity';
import { DesktopNotifModel } from 'notification/desktop-notif.entity';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
import { QuestionGroupModel } from 'question/question-group.entity';
import { SemesterModel } from 'semester/semester.entity';
import { AsyncQuestionModel } from 'asyncQuestion/asyncQuestion.entity';
import { OrganizationModel } from 'organization/organization.entity';
import { Connection, getManager } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  CourseFactory,
  EventFactory,
  QuestionFactory,
  QueueFactory,
  SemesterFactory,
  UserCourseFactory,
  UserFactory,
  OrganizationFactory,
  OrganizationUserFactory,
  OrganizationCourseFactory,
} from '../../test/util/factories';
import { CourseModel } from '../course/course.entity';
import { NonProductionGuard } from '../guards/non-production.guard';
import { QuestionModel } from '../question/question.entity';
import { QueueModel } from '../queue/queue.entity';
import { SeedService } from './seed.service';
import { OrganizationCourseModel } from 'organization/organization-course.entity';
import { OrganizationUserModel } from 'organization/organization-user.entity';
import { QuestionTypeModel } from 'question/question-type.entity';

@UseGuards(NonProductionGuard)
@Controller('seeds')
export class SeedController {
  constructor(
    private _connection: Connection,
    private seedService: SeedService,
  ) {}

  @Get('delete')
  async deleteAll(): Promise<string> {
    // NOTE: order of deletion matters for tables with foreign keys.
    // Children tables should be removed as early as possible.

    await this.seedService.deleteAll(OrganizationCourseModel);
    await this.seedService.deleteAll(OrganizationUserModel);
    await this.seedService.deleteAll(LastRegistrationModel);
    await this.seedService.deleteAll(ProfSectionGroupsModel);
    await this.seedService.deleteAll(QuestionModel);
    await this.seedService.deleteAll(AsyncQuestionModel);
    await this.seedService.deleteAll(QuestionGroupModel);
    await this.seedService.deleteAll(QueueModel);
    await this.seedService.deleteAll(UserCourseModel);
    await this.seedService.deleteAll(EventModel);
    await this.seedService.deleteAll(DesktopNotifModel);
    await this.seedService.deleteAll(PhoneNotifModel);
    await this.seedService.deleteAll(AlertModel);
    await this.seedService.deleteAll(UserModel);
    await this.seedService.deleteAll(CourseSectionMappingModel);
    await this.seedService.deleteAll(CourseModel);
    await this.seedService.deleteAll(SemesterModel);
    await this.seedService.deleteAll(OrganizationModel);
    const manager = getManager();
    manager.query('ALTER SEQUENCE user_model_id_seq RESTART WITH 1;');
    manager.query('ALTER SEQUENCE organization_model_id_seq RESTART WITH 1;');

    return 'Data successfully reset';
  }

  @Get('create')
  async createSeeds(): Promise<string> {
    // First delete the old data
    await this.deleteAll();

    // Then add the new seed data
    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('seed', salt);
    const now = new Date();

    const yesterday = new Date();
    yesterday.setUTCHours(now.getUTCHours() - 24);

    const tomorrow = new Date();
    tomorrow.setUTCHours(now.getUTCHours() + 19);

    const courseExists = await CourseModel.findOne({
      where: { name: 'CS 304' },
    });

    if (!courseExists) {
      // possible collision:
      // If the dev env is active at midnight, the cron job will rescrape events from the ical which
      // synthetically creates events centered around your time.
      // But since the semester is centered in Fall 2020,
      // the events will get filtered out since they arent in that date.
      // you will need to reseed data!
      const semester = await SemesterFactory.create({
        season: 'Fall',
        year: 2023,
      });
      await CourseFactory.create({
        timezone: 'America/Los_Angeles',
        semesterId: semester.id,
      });
    }

    const course = await CourseModel.findOne({
      where: { name: 'CS 304' },
    });

    const userExists = await UserModel.findOne();

    if (!userExists) {
      // Student 1
      const user1 = await UserFactory.create({
        email: 'kw@ubc.ca',
        firstName: 'kevin',
        lastName: 'wang',
        password: hashedPassword1,
      });

      await UserCourseFactory.create({
        user: user1,
        role: Role.STUDENT,
        course: course,
      });

      // Student 2
      const user2 = await UserFactory.create({
        email: 'Justin@ubc.ca',
        firstName: 'Justin',
        lastName: 'Schultz',
        password: hashedPassword1,
      });

      await UserCourseFactory.create({
        user: user2,
        role: Role.STUDENT,
        course: course,
        override: true,
      });

      // TA 1
      const user3 = await UserFactory.create({
        email: 'big@ubc.ca',
        firstName: 'Big',
        lastName: 'Boy',
        password: hashedPassword1,
      });

      await UserCourseFactory.create({
        user: user3,
        role: Role.TA,
        course: course,
      });

      // TA 2
      const user4 = await UserFactory.create({
        email: 'small@ubc.ca',
        firstName: 'Small',
        lastName: 'Boy',
        password: hashedPassword1,
      });

      await UserCourseFactory.create({
        user: user4,
        role: Role.TA,
        course: course,
      });

      // Professor
      const user5 = await UserFactory.create({
        email: 'bigRamon@ubc.ca',
        firstName: 'Ramon',
        lastName: 'Lawrence',
        insights: [
          'QuestionTypeBreakdown',
          'TotalQuestionsAsked',
          'TotalStudents',
        ],
        password: hashedPassword1,
      });

      await UserCourseFactory.create({
        user: user5,
        role: Role.PROFESSOR,
        course: course,
      });

      const organization = await OrganizationFactory.create({
        name: 'UBCO',
        description: 'UBC Okanagan',
        legacyAuthEnabled: true,
        logoUrl:
          'https://ires.ubc.ca/files/2020/11/cropped-UBC-Okanagan-1-logo.jpg',
      });

      await OrganizationUserFactory.create({
        userId: user1.id,
        organizationId: organization.id,
        organizationUser: user1,
        organization: organization,
      });

      await OrganizationUserFactory.create({
        userId: user2.id,
        organizationId: organization.id,
        organizationUser: user2,
        organization: organization,
      });

      await OrganizationUserFactory.create({
        userId: user3.id,
        organizationId: organization.id,
        organizationUser: user3,
        organization: organization,
      });

      await OrganizationUserFactory.create({
        userId: user4.id,
        organizationId: organization.id,
        organizationUser: user4,
        organization: organization,
      });

      await OrganizationUserFactory.create({
        userId: user5.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
        organizationUser: user5,
        organization: organization,
      });

      await OrganizationCourseFactory.create({
        organizationId: organization.id,
        courseId: course.id,
        organization: organization,
        course: course,
      });
    }

    const queue = await QueueFactory.create({
      room: 'Online',
      course: course,
      allowQuestions: true,
    });

    await QuestionFactory.create({
      queue: queue,
      createdAt: new Date(Date.now() - 3500000),
    });
    await QuestionFactory.create({
      queue: queue,
      createdAt: new Date(Date.now() - 2500000),
    });
    await QuestionFactory.create({
      queue: queue,
      createdAt: new Date(Date.now() - 1500000),
    });

    const eventTA = await UserModel.findOne({
      where: {
        firstName: 'Big',
      },
    });

    await EventFactory.create({
      user: eventTA,
      course: course,
      time: yesterday,
      eventType: EventType.TA_CHECKED_IN,
    });

    await EventFactory.create({
      user: eventTA,
      course: course,
      time: new Date(Date.now() - 80000000),
      eventType: EventType.TA_CHECKED_OUT,
    });

    await EventFactory.create({
      user: eventTA,
      course: course,
      time: new Date(Date.now() - 70000000),
      eventType: EventType.TA_CHECKED_IN,
    });

    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);

    await EventFactory.create({
      user: eventTA,
      course: course,
      time: todayAtMidnight,
      eventType: EventType.TA_CHECKED_OUT_FORCED,
    });

    const professorQueue = await QueueFactory.create({
      room: "Professor Lawrence's Hours",
      course: course,
      allowQuestions: true,
      isProfessorQueue: true,
    });

    await QuestionFactory.create({
      queue: professorQueue,
      createdAt: new Date(Date.now() - 1500000),
    });

    return 'Data successfully seeded';
  }

  @Get('fill_queue')
  async fillQueue(): Promise<string> {
    const queue = await QueueModel.findOne();

    await QuestionFactory.create({
      queue: queue,
      createdAt: new Date(Date.now() - 1500000),
    });
    await QuestionFactory.create({
      queue: queue,
      createdAt: new Date(Date.now() - 1500000),
    });
    await QuestionFactory.create({
      queue: queue,
      createdAt: new Date(Date.now() - 1500000),
    });

    return 'Data successfully seeded';
  }
}
