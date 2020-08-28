import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from '@template/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { Connection } from 'typeorm';
import {
  OfficeHourFactory,
  QuestionFactory,
  QueueFactory,
  UserCourseFactory,
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

    const course = await CourseModel.findOne({ relations: ['officeHours'] });
    if (course) {
      course.officeHours = [
        officeHoursToday,
        officeHoursYesterday,
        officeHoursTomorrow,
        officeHoursTodayOverlap,
      ];
      course.save();
    }

    const queue = await QueueFactory.create({
      room: 'WHV 101',
      course: course,
      officeHours: [
        officeHoursToday,
        officeHoursYesterday,
        officeHoursTomorrow,
        officeHoursTodayOverlap,
      ],
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

    return 'Data successfully seeded';
  }

  @Get('fillQueue')
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
    @Body() body: { courseId: number; allowQuestions: boolean },
  ): Promise<QueueModel> {
    let queue: QueueModel;
    const now = new Date();
    const officeHours = await OfficeHourFactory.create({
      startTime: now,
      endTime: new Date(now.valueOf() + 4500000),
    });
    if (body.courseId) {
      const course = await CourseModel.findOneOrFail(body.courseId);
      queue = await QueueFactory.create({
        course: course,
        officeHours: [officeHours],
        allowQuestions: body.allowQuestions ?? false,
      });
    } else {
      queue = await QueueFactory.create({
        officeHours: [officeHours],
        allowQuestions: body.allowQuestions ?? false,
      });
    }
    return queue;
  }

  @Post('createQuestion')
  async createQuestion(
    @Body() body: { queueId: number },
  ): Promise<QuestionModel> {
    let question: QuestionModel;
    if (body.queueId) {
      const queue = await QueueModel.findOneOrFail(body.queueId);
      question = await QuestionFactory.create({
        queue: queue,
        createdAt: new Date(),
      });
    } else {
      question = await QuestionFactory.create();
    }
    return question;
  }
}
