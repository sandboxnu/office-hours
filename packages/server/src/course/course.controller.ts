import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  GetCourseResponse,
  QueuePartial,
  Role,
  TACheckoutResponse,
} from '@koh/common';
import async from 'async';
import { Connection, getRepository, MoreThanOrEqual } from 'typeorm';
import { EventModel, EventType } from 'profile/event-model.entity';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../profile/roles.decorator';
import { User } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueModel } from '../queue/queue.entity';
import { CourseRolesGuard } from './course-roles.guard';
import { CourseModel } from './course.entity';
import { HeatmapService } from './heatmap.service';
import { OfficeHourModel } from './office-hour.entity';
import { QueueSSEService } from '../queue/queue-sse.service';
import moment = require('moment');

@Controller('courses')
@UseGuards(JwtAuthGuard, CourseRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(
    private connection: Connection,
    private queueCleanService: QueueCleanService,
    private queueSSEService: QueueSSEService,
    private heatmapService: HeatmapService,
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
    course.heatmap = await this.heatmapService.getHeatmapFor(id);

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

    await EventModel.create({
      time: new Date(),
      eventType: EventType.TA_CHECKED_IN,
      user,
      courseId,
    }).save();

    await this.queueSSEService.updateQueue(queue.id);
    return queue;
  }

  @Delete(':id/ta_location/:room')
  @Roles(Role.PROFESSOR, Role.TA)
  async checkOut(
    @Param('id') courseId: number,
    @Param('room') room: string,
    @User() user: UserModel,
  ): Promise<TACheckoutResponse> {
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

    await EventModel.create({
      time: new Date(),
      eventType: EventType.TA_CHECKED_OUT,
      user,
      courseId,
    }).save();

    const canClearQueue = await this.queueCleanService.shouldCleanQueue(queue);
    let nextOfficeHourTime = null;

    // find out how long until next office hour
    if (canClearQueue) {
      const soon = moment().add(15, 'minutes').toDate();
      const nextOfficeHour = await OfficeHourModel.findOne({
        where: { startTime: MoreThanOrEqual(soon) },
        order: {
          startTime: 'ASC',
        },
      });
      nextOfficeHourTime = nextOfficeHour?.startTime;
    }
    await this.queueSSEService.updateQueue(queue.id);
    return { queueId: queue.id, canClearQueue, nextOfficeHourTime };
  }
}
