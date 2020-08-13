import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetCourseResponse, QueuePartial, Role } from '@template/common';
import { Connection, getRepository } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { User } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { CourseModel } from './course.entity';
import { Roles } from '../profile/roles.decorator';
import { CourseRolesGuard } from './course-roles.guard';
import { OfficeHourModel } from './office-hour.entity';
import async from 'async';

@Controller('courses')
@UseGuards(JwtAuthGuard, CourseRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(
    private connection: Connection,
    private queueCleanService: QueueCleanService,
  ) {}

  @Get(':id')
  @Roles(Role.PROFESSOR, Role.STUDENT, Role.TA)
  async get(@Param('id') id: number): Promise<GetCourseResponse> {
    // TODO: for all course endpoint, check if they're a student or a TA
    const course = await CourseModel.findOne(id, {
      relations: ['queues', 'queues.staffList'],
    });

    // Use raw query for performance (avoid entity instantiation and serialization)
    course.officeHours = await getRepository(OfficeHourModel)
      .createQueryBuilder('oh')
      .select(['id', 'title', `"startTime"`, `"endTime"`])
      .where('oh.courseId = :courseId', { courseId: course.id })
      .getRawMany();

    course.queues = await async.filter(
      course.queues,
      async (q) => await q.isOpen(),
    );
    await async.each(course.queues, async (q) => await q.addQueueTimes());

    return course;
  }

  @Post(':id/ta_location/:room')
  @Roles(Role.PROFESSOR, Role.TA)
  async checkIn(
    @Param('id') courseId: number,
    @Param('room') room: string,
    @User() user: UserModel,
  ): Promise<QueuePartial> {
    let queue = await QueueModel.findOne(
      {
        room,
        courseId,
      },
      { relations: ['staffList'] },
    );

    if (!queue) {
      queue = await QueueModel.create({
        room,
        courseId,
        staffList: [],
        questions: [],
      }).save();
    }

    queue.staffList.push(user);
    await queue.save();

    return queue;
  }

  @Delete(':id/ta_location/:room')
  @Roles(Role.PROFESSOR, Role.TA)
  async checkOut(
    @Param('id') courseId: number,
    @Param('room') room: string,
    @User() user: UserModel,
  ): Promise<void> {
    const queue = await QueueModel.findOne(
      {
        room,
        courseId,
      },
      { relations: ['staffList'] },
    );

    queue.staffList = queue.staffList.filter((e) => e.id !== user.id);
    await queue.save();

    // Clean up queue if necessary
    await this.queueCleanService.cleanQueue(queue.id);
  }
}
