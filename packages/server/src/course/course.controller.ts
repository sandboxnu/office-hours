import {
  ERROR_MESSAGES,
  GetCourseOverridesResponse,
  GetCourseResponse,
  QueuePartial,
  Role,
  SubmitCourseParams,
  TACheckinTimesResponse,
  TACheckoutResponse,
  UpdateCourseOverrideBody,
  UpdateCourseOverrideResponse,
} from '@koh/common';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import async from 'async';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { Connection, getRepository, MoreThanOrEqual } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { Roles } from '../profile/roles.decorator';
import { User } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueSSEService } from '../queue/queue-sse.service';
import { QueueModel } from '../queue/queue.entity';
import { CourseRolesGuard } from './course-roles.guard';
import { CourseModel } from './course.entity';
import { CourseService } from './course.service';
import { HeatmapService } from './heatmap.service';
import { IcalService } from './ical.service';
import { OfficeHourModel } from './office-hour.entity';
import { SemesterModel } from '../semester/semester.entity';
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
    private icalService: IcalService,
    private courseService: CourseService,
  ) {}

  @Get(':id')
  @Roles(Role.PROFESSOR, Role.STUDENT, Role.TA)
  async get(
    @Param('id') id: number,
    @User() user: UserModel,
  ): Promise<GetCourseResponse> {
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
    course.heatmap = await this.heatmapService.getCachedHeatmapFor(id);

    const userCourseModel = await UserCourseModel.findOne({
      where: {
        user,
        courseId: id,
      },
    });

    if (userCourseModel.role === Role.PROFESSOR) {
      course.queues = await async.filter(
        course.queues,
        async (q) => (await q.checkIsOpen()) || q.isProfessorQueue,
      );
    } else {
      course.queues = await async.filter(
        course.queues,
        async (q) => await q.checkIsOpen(),
      );
    }

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
    // First ensure user is not checked into another queue
    const queues = await QueueModel.find({
      where: {
        courseId: courseId,
      },
      relations: ['staffList'],
    });

    if (queues.some((q) => q.staffList.some((staff) => staff.id === user.id))) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.courseController.checkIn.cannotCheckIntoMultipleQueues,
      );
    }

    let queue = await QueueModel.findOne(
      {
        room,
        courseId,
      },
      { relations: ['staffList'] },
    );

    if (!queue) {
      const userCourseModel = await UserCourseModel.findOne({
        where: {
          user,
          courseId,
        },
      });

      if (userCourseModel.role === Role.PROFESSOR) {
        queue = await QueueModel.create({
          room,
          courseId,
          staffList: [],
          questions: [],
          allowQuestions: true,
          isProfessorQueue: true, // only professors should be able to make queues
        }).save();
      } else {
        throw new ForbiddenException(
          ERROR_MESSAGES.courseController.checkIn.cannotCreateNewQueueIfNotProfessor,
        );
      }
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

  @Post(':id/update_calendar')
  @Roles(Role.PROFESSOR)
  async updateCalendar(@Param('id') courseId: number): Promise<void> {
    const course = await CourseModel.findOne(courseId);
    await this.icalService.updateCalendarForCourse(course);
  }

  @Get(':id/course_override')
  @Roles(Role.PROFESSOR)
  async getCourseOverrides(
    @Param('id') courseId: number,
  ): Promise<GetCourseOverridesResponse> {
    const resp = await UserCourseModel.find({
      where: { courseId, override: true },
      relations: ['user'],
    });
    return {
      data: resp.map((row) => ({
        id: row.id,
        role: row.role,
        name: row.user.name,
        email: row.user.email,
      })),
    };
  }

  @Post(':id/update_override')
  @Roles(Role.PROFESSOR)
  async addOverride(
    @Param('id') courseId: number,
    @Body() overrideInfo: UpdateCourseOverrideBody,
  ): Promise<UpdateCourseOverrideResponse> {
    const user = await UserModel.findOne({
      where: { email: overrideInfo.email },
    });
    if (!user)
      throw new BadRequestException(
        ERROR_MESSAGES.courseController.noUserFound,
      );
    const userId = user.id;
    let userCourse = await UserCourseModel.findOne({
      where: { courseId, userId },
    });
    if (!userCourse) {
      userCourse = await UserCourseModel.create({
        userId,
        courseId,
        role: overrideInfo.role,
        override: true,
      }).save();
    } else {
      userCourse.override = true;
      userCourse.role = overrideInfo.role;
      await userCourse.save();
    }
    return {
      id: userCourse.id,
      role: userCourse.role,
      name: user.name,
      email: user.email,
    };
  }

  @Delete(':id/update_override')
  @Roles(Role.PROFESSOR)
  async deleteOverride(
    @Param('id') courseId: number,
    @Body() overrideInfo: UpdateCourseOverrideBody,
  ): Promise<void> {
    const user = await UserModel.findOne({
      where: { email: overrideInfo.email },
    });
    if (!user)
      throw new BadRequestException(
        ERROR_MESSAGES.courseController.noUserFound,
      );
    const userId = user.id;
    const userCourse = await UserCourseModel.findOne({
      where: { courseId, userId, override: true },
    });
    await UserCourseModel.remove(userCourse);
  }

  @Post('submit_course')
  async submitCourse(@Body() body: SubmitCourseParams): Promise<void> {
    const season = body.semester.split(' ')[0];
    const year = parseInt(body.semester.split(' ')[1]);

    const semester = await SemesterModel.findOne({
      where: { season, year },
    });
    if (!semester)
      throw new BadRequestException(
        ERROR_MESSAGES.courseController.noSemesterFound,
      );

    // create the submitted course
    const course = await CourseModel.create({
      name: body.name,
      coordinator_email: body.coordinator_email,
      icalURL: body.icalURL,
      semesterId: semester.id,
      enabled: false,
      pending: true,
      timezone: body.timezone,
    }).save();

    // create CourseSectionMappings for each unique submitted section number
    new Set(body.sections).forEach(async (section) => {
      await CourseSectionMappingModel.create({
        genericCourseName: body.name,
        section,
        courseId: course.id,
      }).save();
    });
  }

  @Get(':id/ta_check_in_times')
  @Roles(Role.PROFESSOR)
  async taCheckinTimes(
    @Param('id') courseId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<TACheckinTimesResponse> {
    return await this.courseService.getTACheckInCheckOutTimes(
      courseId,
      startDate,
      endDate,
    );
  }
}
