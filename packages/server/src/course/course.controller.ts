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
import { GetCourseResponse, QueuePartial, Role } from '@koh/common';
import async from 'async';
import { Connection, getRepository } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../profile/roles.decorator';
import { User } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueModel } from '../queue/queue.entity';
import { CourseRolesGuard } from './course-roles.guard';
import { CourseModel } from './course.entity';
import { OfficeHourModel } from './office-hour.entity';
import { QueueSSEService } from 'queue/queue-sse.service';

@Controller('courses')
@UseGuards(JwtAuthGuard, CourseRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(
    private connection: Connection,
    private queueCleanService: QueueCleanService,
    private queueSSEService: QueueSSEService,
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
      async (q) => await q.checkIsOpen(),
    );
    await async.each(course.queues, async (q) => {
      await q.addQueueTimes();
      await q.addQueueSize();
    });

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
        allowQuestions: true,
      }).save();
    }

    if (queue.staffList.length === 0) {
      queue.allowQuestions = true;
    }

    queue.staffList.push(user);
    await queue.save();

    await this.queueSSEService.updateQueue(queue.id);
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
    if (queue.staffList.length === 0) {
      queue.allowQuestions = false;
    }
    await queue.save();
    // Clean up queue if necessary
    setTimeout(async () => {
      await this.queueCleanService.cleanQueue(queue.id);
      await this.queueSSEService.updateQueue(queue.id);
    });
  }
}
