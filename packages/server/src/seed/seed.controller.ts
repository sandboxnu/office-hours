import { Controller, Get, UseGuards } from '@nestjs/common';
import { Connection } from 'typeorm';
import { SeedService } from './seed.service';
import { QuestionModel } from '../question/question.entity';
import { OfficeHourModel } from '../course/office-hour.entity';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from '../course/course.entity';
import {
  QueueFactory,
  OfficeHourFactory,
  QuestionFactory,
} from '../../test/util/factories';
import { NonProductionGuard } from '../non-production.guard';

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

    const officeHours = await OfficeHourFactory.create({
      startTime: now,
      endTime: new Date(now.valueOf() + 4500000),
    });
    const course = await CourseModel.findOne({ relations: ['officeHours'] });
    if (course) {
      course.officeHours = [officeHours];
      course.save();
    }

    const queue = await QueueFactory.create({
      room: 'WHV 101',
      course: course,
      officeHours: [officeHours],
    });

    await QuestionFactory.create({ queue: queue });
    await QuestionFactory.create({ queue: queue });
    await QuestionFactory.create({ queue: queue });

    return 'Data successfully seeded';
  }
}
