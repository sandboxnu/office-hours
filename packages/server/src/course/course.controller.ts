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
import { uniq } from 'lodash';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';
import { User } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from './course.entity';
import { Roles } from './course-roles.decorator';
import { RolesGuard } from './course-roles.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(private connection: Connection) {}

  @Get(':id')
  @Roles(Role.PROFESSOR, Role.STUDENT, Role.TA)
  async get(@Param('id') id: number): Promise<GetCourseResponse> {
    // TODO: for all course endpoint, check if they're a student or a TA
    const course = await CourseModel.findOne(id, {
      relations: ['officeHours'],
    });

    const now = new Date();
    const MS_IN_MINUTE = 60000;

    const officeHoursHappeningNow = course.officeHours.filter(
      (e) =>
        e.startTime.valueOf() - 15 * MS_IN_MINUTE < now.valueOf() &&
        e.endTime.valueOf() + 1 * MS_IN_MINUTE > now.valueOf(),
    );

    const queues = await QueueModel.find({
      where: {
        courseId: id,
      },
      relations: ['staffList'],
    });

    const nonEmptyQueues = queues.filter((e) => e.staffList.length > 0);

    const queuesHappeningNow = [];

    for (const oh of officeHoursHappeningNow) {
      const q = queues.find((q) => q.room === oh.room);
      if (q) {
        q.time = {
          start: oh.startTime,
          end: oh.endTime,
        };
        queuesHappeningNow.push(q);
      }
    }

    course.queues = uniq([...nonEmptyQueues, ...queuesHappeningNow]);
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
  }
}
