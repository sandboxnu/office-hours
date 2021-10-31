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
  HttpException,
  HttpStatus,
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
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { CourseRolesGuard } from '../guards/course-roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueSSEService } from '../queue/queue-sse.service';
import { QueueModel } from '../queue/queue.entity';
import { SemesterModel } from '../semester/semester.entity';
import { CourseModel } from './course.entity';
import { CourseService } from './course.service';
import { HeatmapService } from './heatmap.service';
import { IcalService } from './ical.service';
import { OfficeHourModel } from './office-hour.entity';
import moment = require('moment');

@Controller('courses')
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
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR, Role.STUDENT, Role.TA)
  async get(
    @Param('id') id: number,
    @User() user: UserModel,
  ): Promise<GetCourseResponse> {
    // TODO: for all course endpoint, check if they're a student or a TA
    const course = await CourseModel.findOne(id, {
      relations: ['queues', 'queues.staffList'],
    });

    if (course === null || course === undefined) {
      console.error(
        ERROR_MESSAGES.courseController.courseNotFound + 'Course ID: ' + id,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    // Use raw query for performance (avoid entity instantiation and serialization)

    try {
      course.officeHours = await getRepository(OfficeHourModel)
        .createQueryBuilder('oh')
        .select(['id', 'title', `"startTime"`, `"endTime"`])
        .where('oh.courseId = :courseId', { courseId: course.id })
        .getRawMany();
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.courseOfficeHourError +
          '\n' +
          'Error message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseOfficeHourError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      course.heatmap = await this.heatmapService.getCachedHeatmapFor(id);
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.courseOfficeHourError +
          '\n' +
          'Error message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseHeatMapError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const userCourseModel = await UserCourseModel.findOne({
      where: {
        user,
        courseId: id,
      },
    });

    if (userCourseModel === undefined || userCourseModel === null) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseModelError,
        HttpStatus.NOT_FOUND,
      );
    }

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

    try {
      await async.each(course.queues, async (q) => {
        await q.addQueueTimes();
        await q.addQueueSize();
      });
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.updatedQueueError +
          '\n' +
          'Error message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.updatedQueueError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return course;
  }

  @Post(':id/ta_location/:room')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
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

    if (
      queues &&
      queues.some((q) => q.staffList.some((staff) => staff.id === user.id))
    ) {
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

      if (userCourseModel === null || userCourseModel === undefined) {
        throw new HttpException(
          ERROR_MESSAGES.courseController.courseModelError,
          HttpStatus.NOT_FOUND,
        );
      }

      queue = await QueueModel.create({
        room,
        courseId,
        staffList: [],
        questions: [],
        allowQuestions: true,
        isProfessorQueue: userCourseModel.role === Role.PROFESSOR,
      }).save();
    }

    if (queue.staffList.length === 0) {
      queue.allowQuestions = true;
    }

    queue.staffList.push(user);
    try {
      await queue.save();
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.saveQueueError +
          '\nError message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.saveQueueError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      await EventModel.create({
        time: new Date(),
        eventType: EventType.TA_CHECKED_IN,
        user,
        courseId,
        queueId: queue.id,
      }).save();
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.createEventError +
          '\nError message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.createEventError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      await this.queueSSEService.updateQueue(queue.id);
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.createEventError +
          '\nError message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.updatedQueueError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return queue;
  }

  @Delete(':id/ta_location/:room')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
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

    if (queue === undefined || queue === null) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.queueNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    queue.staffList = queue.staffList.filter((e) => e.id !== user.id);
    if (queue.staffList.length === 0) {
      queue.allowQuestions = false;
    }
    try {
      await queue.save();
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.saveQueueError +
          '\nError Message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.saveQueueError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      await EventModel.create({
        time: new Date(),
        eventType: EventType.TA_CHECKED_OUT,
        user,
        courseId,
        queueId: queue.id,
      }).save();
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.createEventError +
          '\nError message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.createEventError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    let canClearQueue = null;

    try {
      canClearQueue = await this.queueCleanService.shouldCleanQueue(queue);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.clearQueueError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

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
    try {
      await this.queueSSEService.updateQueue(queue.id);
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.createEventError +
          '\nError message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.updatedQueueError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return { queueId: queue.id, canClearQueue, nextOfficeHourTime };
  }

  @Post(':id/update_calendar')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async updateCalendar(@Param('id') courseId: number): Promise<void> {
    const course = await CourseModel.findOne(courseId);
    if (course === null || course === undefined) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseNotFound,
        HttpStatus.NOT_FOUND,
      );
    }
    try {
      await this.icalService.updateCalendarForCourse(course);
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.icalCalendarUpdate,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/course_override')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async getCourseOverrides(
    @Param('id') courseId: number,
  ): Promise<GetCourseOverridesResponse> {
    const resp = await UserCourseModel.find({
      where: { courseId, override: true },
      relations: ['user'],
    });

    if (resp === null || resp === undefined) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseModelError,
        HttpStatus.NOT_FOUND,
      );
    }

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
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
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
      try {
        userCourse = await UserCourseModel.create({
          userId,
          courseId,
          role: overrideInfo.role,
          override: true,
        }).save();
      } catch (err) {
        console.error(err);
        throw new HttpException(
          ERROR_MESSAGES.courseController.createCourse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } else {
      userCourse.override = true;
      userCourse.role = overrideInfo.role;
      try {
        await userCourse.save();
      } catch (err) {
        console.error(err);
        throw new HttpException(
          ERROR_MESSAGES.courseController.updateCourse,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return {
      id: userCourse.id,
      role: userCourse.role,
      name: user.name,
      email: user.email,
    };
  }

  @Delete(':id/update_override')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
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

  @Post('submit_course')
  async submitCourse(@Body() body: SubmitCourseParams): Promise<void> {
    if (body.password !== process.env.APPLY_PASSWORD) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.courseController.invalidApplyURL,
      );
    }

    const season = body.semester.split(' ')[0];
    const year = parseInt(body.semester.split(' ')[1]);

    const semester = await SemesterModel.findOne({
      where: { season, year },
    });
    if (!semester)
      throw new BadRequestException(
        ERROR_MESSAGES.courseController.noSemesterFound,
      );

    let course = null;
    try {
      // create the submitted course
      course = await CourseModel.create({
        name: body.name,
        coordinator_email: body.coordinator_email,
        icalURL: body.icalURL,
        semesterId: semester.id,
        enabled: false,
        pending: true,
        timezone: body.timezone,
      }).save();
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.createCourse,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      // create CourseSectionMappings for each unique submitted section number
      new Set(body.sections).forEach(async (section) => {
        await CourseSectionMappingModel.create({
          genericCourseName: body.name,
          section,
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
  }

  @Get(':id/ta_check_in_times')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async taCheckinTimes(
    @Param('id') courseId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<TACheckinTimesResponse> {
    try {
      return await this.courseService.getTACheckInCheckOutTimes(
        courseId,
        startDate,
        endDate,
      );
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.courseController.checkInTime,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/self_enroll')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async toggleSelfEnroll(@Param('id') courseId: number): Promise<void> {
    const course = await CourseModel.findOne(courseId);
    course.selfEnroll = !course.selfEnroll;
    await course.save();
  }
}
