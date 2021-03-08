import { CreateQuestionParams, Role } from '@koh/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DesktopNotifModel } from 'notification/desktop-notif.entity';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { EventModel } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
import { Connection, getManager } from 'typeorm';
import {
  CourseFactory,
  OfficeHourFactory,
  QuestionFactory,
  QueueFactory,
  SemesterFactory,
  UserCourseFactory,
  UserFactory,
} from '../../test/util/factories';
import { CourseModel } from '../course/course.entity';
import { OfficeHourModel } from '../course/office-hour.entity';
import { NonProductionGuard } from '../non-production.guard';
import { QuestionModel } from '../question/question.entity';
import { QueueModel } from '../queue/queue.entity';
import { SeedService } from './seed.service';

@Controller('seeds')
@UseGuards(NonProductionGuard)
export class SeedController {
  constructor(
    private connection: Connection,
    private seedService: SeedService,
  ) {}

  @Get('delete')
  async deleteAll(): Promise<string> {
    await this.seedService.deleteAll(OfficeHourModel);
    await this.seedService.deleteAll(QuestionModel);
    await this.seedService.deleteAll(QueueModel);
    await this.seedService.deleteAll(UserCourseModel);
    await this.seedService.deleteAll(EventModel);
    await this.seedService.deleteAll(DesktopNotifModel);
    await this.seedService.deleteAll(PhoneNotifModel);
    await this.seedService.deleteAll(UserModel);
    await this.seedService.deleteAll(CourseModel);
    const manager = getManager();
    manager.query('ALTER SEQUENCE user_model_id_seq RESTART WITH 1;');

    return 'Data successfully reset';
  }

  @Get('create')
  async createSeeds(): Promise<string> {
    // First delete the old data
    await this.deleteAll();

    // Then add the new seed data
    const now = new Date();

    const yesterday = new Date();
    yesterday.setUTCHours(now.getUTCHours() - 24);

    const tomorrow = new Date();
    tomorrow.setUTCHours(now.getUTCHours() + 19);

    const officeHoursToday = await OfficeHourFactory.create({
      startTime: now,
      endTime: new Date(now.valueOf() + 4500000),
    });
    const officeHoursTodayOverlap = await OfficeHourFactory.create({
      startTime: new Date(now.valueOf() - 4500000),
      endTime: new Date(now.valueOf() + 1000000),
    });
    const officeHoursYesterday = await OfficeHourFactory.create({
      startTime: yesterday,
      endTime: new Date(yesterday.valueOf() + 4500000),
    });
    const officeHoursTomorrow = await OfficeHourFactory.create({
      startTime: tomorrow,
      endTime: new Date(tomorrow.valueOf() + 4500000),
    });
    const professorOfficeHours = await OfficeHourFactory.create({
      startTime: now,
      endTime: new Date(now.valueOf() + 4500000),
    });

    const courseExists = await CourseModel.findOne({
      where: { name: 'CS 2500' },
    });
    if (!courseExists) {
      await SemesterFactory.create({ season: 'Fall', year: 2020 });
      await CourseFactory.create();
    }

    const course = await CourseModel.findOne({
      where: { name: 'CS 2500' },
      relations: ['officeHours'],
    });

    course.officeHours = [
      officeHoursToday,
      officeHoursYesterday,
      officeHoursTomorrow,
      officeHoursTodayOverlap,
      professorOfficeHours,
    ];
    course.save();

    const userExists = await UserModel.findOne();
    if (!userExists) {
      // Student 1
      const user1 = await UserFactory.create({
        email: 'liu.sta@northeastern.edu',
        firstName: 'Stanley',
        lastName: 'Liu',
      });
      await UserCourseFactory.create({
        user: user1,
        role: Role.STUDENT,
        course: course,
      });
      // Stundent 2
      const user2 = await UserFactory.create({
        email: 'takayama.a@northeastern.edu',
        firstName: 'Alex',
        lastName: 'Takayama',
      });
      await UserCourseFactory.create({
        user: user2,
        role: Role.STUDENT,
        course: course,
        override: true,
      });

      // TA 1
      const user3 = await UserFactory.create({
        email: 'stenzel.w@northeastern.edu',
        firstName: 'Will',
        lastName: 'Stenzel',
      });
      await UserCourseFactory.create({
        user: user3,
        role: Role.TA,
        course: course,
      });
      // TA 2
      const user4 = await UserFactory.create({
        email: 'chu.daj@northeastern.edu',
        firstName: 'Da-Jin',
        lastName: 'Chu',
      });
      await UserCourseFactory.create({
        user: user4,
        role: Role.TA,
        course: course,
      });
      // Professor (Snarky!!)
      const user5 = await UserFactory.create({
        email: 'li.edwa@northeastern.edu',
        firstName: 'Eddy',
        lastName: 'Li',
      });
      await UserCourseFactory.create({
        user: user5,
        role: Role.PROFESSOR,
        course: course,
      });
    }

    const queue = await QueueFactory.create({
      room: 'Online',
      course: course,
      officeHours: [
        officeHoursToday,
        officeHoursYesterday,
        officeHoursTomorrow,
        officeHoursTodayOverlap,
      ],
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

    const professorQueue = await QueueFactory.create({
      room: "Professor Li's Hours",
      course: course,
      officeHours: [professorOfficeHours],
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

  @Post('createUser')
  async createUser(
    @Body() body: { role: Role; courseId: number },
  ): Promise<UserCourseModel> {
    let ta: UserCourseModel;
    if (body.courseId) {
      const course = await CourseModel.findOneOrFail(body.courseId);
      ta = await UserCourseFactory.create({ role: body.role, course: course });
    } else {
      ta = await UserCourseFactory.create({ role: body.role });
    }
    return ta;
  }

  @Post('createQueue')
  async createQueue(
    @Body()
    body: {
      courseId: number;
      allowQuestions: boolean;
      // closes in n milliseconds from now
      closesIn?: number;
    },
  ): Promise<QueueModel> {
    const now = new Date();
    const officeHours = await OfficeHourFactory.create({
      startTime: now,
      endTime: new Date(now.valueOf() + (body?.closesIn || 4500000)),
    });
    const options = {
      officeHours: [officeHours],
      allowQuestions: body.allowQuestions ?? false,
    };
    if (body.courseId) {
      const course = await CourseModel.findOneOrFail(body.courseId);
      options['course'] = course;
    }
    const queue: QueueModel = await QueueFactory.create(options);
    return queue;
  }

  @Post('createQuestion')
  async createQuestion(
    @Body()
    body: {
      queueId: number;
      studentId: number;
      data: CreateQuestionParams;
    },
  ): Promise<QuestionModel> {
    const options = {};
    if (body.queueId) {
      const queue = await QueueModel.findOneOrFail(body.queueId);
      options['queue'] = queue;
    }
    if (body.studentId) {
      const student = await UserModel.findOneOrFail(body.studentId);
      options['creator'] = student;
    }
    const question: QuestionModel = await QuestionFactory.create({
      ...options,
      ...body.data,
      createdAt: new Date(),
    });
    return question;
  }

  @Post('createQueueWithoutOfficeHour')
  async createQueueWithoutOfficeHour(
    @Body()
    body: {
      courseId: number;
      allowQuestions: boolean;
    },
  ): Promise<QueueModel> {
    const options = {
      allowQuestions: body.allowQuestions ?? false,
      officeHours: [],
    };
    if (body.courseId) {
      const course = await CourseModel.findOneOrFail(body.courseId);
      options['course'] = course;
    }
    return await QueueFactory.create(options);
  }
}
