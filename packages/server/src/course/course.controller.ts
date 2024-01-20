import {
  AsyncQuestionResponse,
  asyncQuestionStatus,
  CoursePartial,
  EditCourseInfoParams,
  ERROR_MESSAGES,
  GetCourseOverridesResponse,
  GetCourseResponse,
  GetCourseUserInfoResponse,
  GetLimitedCourseResponse,
  QueuePartial,
  RegisterCourseParams,
  Role,
  TACheckinTimesResponse,
  TACheckoutResponse,
  UBCOuserParam,
  UpdateCourseOverrideBody,
  UpdateCourseOverrideResponse,
} from '@koh/common';
import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import async from 'async';
import { Response, Request } from 'express';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { Connection } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { User, UserId } from '../decorators/user.decorator';
import { CourseRolesGuard } from '../guards/course-roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from './course.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueSSEService } from '../queue/queue-sse.service';
import { CourseService } from './course.service';
import { HeatmapService } from './heatmap.service';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';
import { AsyncQuestionModel } from 'asyncQuestion/asyncQuestion.entity';
import { OrganizationCourseModel } from 'organization/organization-course.entity';

@Controller('courses')
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(
    private connection: Connection,
    private queueCleanService: QueueCleanService,
    private queueSSEService: QueueSSEService,
    private heatmapService: HeatmapService,
    private courseService: CourseService,
  ) {}

  // get all courses
  @Get()
  async getAllCourses(): Promise<CoursePartial[]> {
    const courses = await CourseModel.find();
    if (!courses) {
      throw new NotFoundException();
    }
    return courses.map((course) => ({ id: course.id, name: course.name }));
  }

  @Get(':oid/organization_courses')
  @UseGuards(JwtAuthGuard)
  async getOrganizationCourses(
    @Res() res: Response,
    @Param('oid') oid: number,
  ): Promise<Response<[]>> {
    const courses = await OrganizationCourseModel.find({
      where: {
        organizationId: oid,
      },
      relations: ['course'],
    });

    if (!courses) {
      return res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.courseController.courseNotFound,
      });
    }

    const coursesPartial = courses.map((course) => ({
      id: course.course.id,
      name: course.course.name,
    }));

    res.status(HttpStatus.OK).send({
      coursesPartial,
    });
  }

  @Get(':cid/questions')
  @UseGuards(JwtAuthGuard)
  async getAsyncQuestions(
    @Param('cid') cid: number,
  ): Promise<AsyncQuestionResponse> {
    const all = await AsyncQuestionModel.find({
      where: {
        courseId: cid,
      },
      relations: ['creator', 'course', 'images'],
    });
    if (!all) {
      throw NotFoundException;
    }
    // const course = await CourseModel.findOne({
    //   where: {
    //     id: cid,
    //   },
    // });
    // This will enable viewing with displaytypes function
    // let questionsDB = all;
    // if (course.asyncQuestionDisplayTypes[0] !== 'all') {
    //   questionsDB = all.filter((question) =>
    //     question.course.asyncQuestionDisplayTypes.includes(
    //       question.questionType,
    //     ),
    //   );
    // }
    const questions = new AsyncQuestionResponse();
    questions.helpedQuestions = all.filter(
      (question) => question.status === asyncQuestionStatus.Resolved,
    );
    questions.waitingQuestions = all.filter(
      (question) => question.status === asyncQuestionStatus.Waiting,
    );
    questions.otherQuestions = all.filter(
      (question) =>
        question.status === asyncQuestionStatus.StudentDeleted ||
        question.status === asyncQuestionStatus.TADeleted,
    );
    questions.visibleQuestions = all.filter(
      (question) =>
        question.visible === true &&
        question.status !== asyncQuestionStatus.TADeleted,
    );
    return questions;
  }

  @Get('limited/:id/:code')
  async getLimitedCourseResponse(
    @Param('id') id: number,
    @Param('code') code: string,
    @Res() res: Response,
  ): Promise<Response<GetLimitedCourseResponse>> {
    const courseWithOrganization = await CourseModel.findOne({
      where: {
        id: id,
        courseInviteCode: code,
      },
      relations: ['organizationCourse', 'organizationCourse.organization'],
    });

    if (!courseWithOrganization) {
      res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.courseController.courseNotFound,
      });
      return;
    }

    const organization =
      courseWithOrganization.organizationCourse?.organization || null;

    const course_response = {
      id: courseWithOrganization.id,
      name: courseWithOrganization.name,
      organizationCourse: organization,
      courseInviteCode: courseWithOrganization.courseInviteCode,
    };

    res.status(HttpStatus.OK).send(course_response);
    return;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR, Role.STUDENT, Role.TA)
  async get(
    @Param('id') id: number,
    @User() user: UserModel,
  ): Promise<GetCourseResponse> {
    // TODO: for all course endpoint, check if they're a student or a TA
    const course = await CourseModel.findOne(id, {
      relations: ['queues', 'queues.staffList', 'organizationCourse'],
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

    if (
      userCourseModel.role === Role.PROFESSOR ||
      userCourseModel.role === Role.TA
    ) {
      course.queues = await async.filter(
        course.queues,
        async (q) => !q.isDisabled,
      );
    } else if (userCourseModel.role === Role.STUDENT) {
      course.queues = await async.filter(
        course.queues,
        async (q) => !q.isDisabled && (await q.checkIsOpen()),
      );
    }

    // make sure all of isopen is populated since we need it in FE
    for (const que of course.queues) {
      await que.checkIsOpen();
    }

    try {
      await async.each(course.queues, async (q) => {
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

    const organizationCourse = await OrganizationCourseModel.findOne({
      where: {
        courseId: id,
      },
      relations: ['organization'],
    });

    const organization =
      organizationCourse === undefined ? null : organizationCourse.organization;

    const course_response = {
      ...course,
      crns: null,
      organizationCourse: organization,
    };
    try {
      course_response.crns = await CourseSectionMappingModel.find({ course });
    } catch (err) {
      console.error(
        ERROR_MESSAGES.courseController.courseOfficeHourError +
          '\n' +
          'Error message: ' +
          err,
      );
      throw new HttpException(
        ERROR_MESSAGES.courseController.courseCrnsError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return course_response;
  }

  @Patch(':id/edit_course')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR, Role.TA)
  async editCourseInfo(
    @Param('id') courseId: number,
    @Body() coursePatch: EditCourseInfoParams,
  ): Promise<void> {
    await this.courseService.editCourse(courseId, coursePatch);
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

    const queue = await QueueModel.findOne(
      {
        room,
        courseId,
        isDisabled: false,
      },
      { relations: ['staffList'] },
    );

    const userCourseModel = await UserCourseModel.findOne({
      where: {
        user,
        courseId,
      },
    });

    if (!queue) {
      if (userCourseModel === null || userCourseModel === undefined) {
        throw new HttpException(
          ERROR_MESSAGES.courseController.courseModelError,
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        ERROR_MESSAGES.courseController.queueNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    if (userCourseModel.role === Role.TA && queue.isProfessorQueue) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.courseController.queueNotAuthorized,
      );
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

  @Post(':id/generate_queue/:room')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR, Role.TA)
  async generateQueue(
    @Param('id') courseId: number,
    @Param('room') room: string,
    @User() user: UserModel,
    @Body()
    body: {
      notes: string;
      isProfessorQueue: boolean;
    },
  ): Promise<QueueModel> {
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

    const queue = await QueueModel.findOne({
      room,
      courseId,
      isDisabled: false,
    });

    if (queue) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.queueAlreadyExists,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userCourseModel.role === Role.TA && body.isProfessorQueue) {
      throw new UnauthorizedException(
        ERROR_MESSAGES.courseController.queueNotAuthorized,
      );
    }
    try {
      return await QueueModel.create({
        room,
        courseId,
        staffList: [],
        questions: [],
        allowQuestions: true,
        notes: body.notes,
        isProfessorQueue: body.isProfessorQueue,
      }).save();
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
        isDisabled: false,
      },
      { relations: ['staffList'] },
    );

    if (queue === undefined || queue === null) {
      throw new HttpException(
        ERROR_MESSAGES.courseController.queueNotFound,
        HttpStatus.NOT_FOUND,
      );
    }

    // Do nothing if user not already in stafflist
    if (!queue.staffList.find((e) => e.id === user.id)) return;

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
    return { queueId: queue.id };
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
    await this.courseService.removeUserFromCourse(userCourse);
  }

  @Delete(':id/withdraw_course')
  @UseGuards(JwtAuthGuard)
  async withdrawCourse(
    @Param('id') courseId: number,
    @UserId() userId: number,
  ): Promise<void> {
    const userCourse = await UserCourseModel.findOne({
      where: { courseId, userId },
    });
    await this.courseService.removeUserFromCourse(userCourse);
  }

  @Post('/register_courses')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.PROFESSOR)
  async registerCourses(
    @Body() body: RegisterCourseParams[],
    @UserId() userId: number,
  ): Promise<void> {
    await this.courseService.registerCourses(body, userId);
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

  @Get(':id/get_user_info/:page/:role?')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async getUserInfo(
    @Param('id') courseId: number,
    @Param('page') page: number,
    @Param('role') role?: Role,
    @Query('search') search?: string,
  ): Promise<GetCourseUserInfoResponse> {
    const pageSize = 50;
    if (!search) {
      search = '';
    }
    const users = await this.courseService.getUserInfo(
      courseId,
      page,
      pageSize,
      search,
      role,
    );
    return users;
  }

  @Post(':id/self_enroll')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async toggleSelfEnroll(@Param('id') courseId: number): Promise<void> {
    const course = await CourseModel.findOne(courseId);
    course.selfEnroll = !course.selfEnroll;
    await course.save();
  }

  @Post('enroll_by_invite_code/:code')
  @UseGuards(JwtAuthGuard)
  async enrollCourseByInviteCode(
    @Param('code') code: string,
    @Body() body: UBCOuserParam,
    @Res() res: Response,
  ): Promise<Response<void>> {
    const user = await UserModel.findOne({
      where: {
        email: body.email,
      },
      relations: ['organizationUser', 'courses'],
    });

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send({ message: 'User not found' });
      return;
    }

    const course = await OrganizationCourseModel.findOne({
      where: {
        organizationId: user.organizationUser.organizationId,
        courseId: body.selected_course,
      },
      relations: ['course'],
    });

    if (!course) {
      res.status(HttpStatus.NOT_FOUND).send({
        message: ERROR_MESSAGES.courseController.courseNotFound,
      });
      return;
    }

    if (course.course.courseInviteCode !== code) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: ERROR_MESSAGES.courseController.invalidInviteCode,
      });
      return;
    }

    await this.courseService
      .addStudentToCourse(course.course, user)
      .then((resp) => {
        if (resp) {
          res
            .status(HttpStatus.OK)
            .send({ message: 'User is added to this course' });
        } else {
          res.status(HttpStatus.BAD_REQUEST).send({
            message:
              'User cannot be added to course. Please check if the user is already in the course',
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
      });
    return;
  }

  @Post(':id/add_student/:sid')
  @UseGuards(JwtAuthGuard, CourseRolesGuard)
  @Roles(Role.PROFESSOR)
  async addStudent(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') courseId: number,
    @Param('sid') studentId: number,
  ): Promise<Response<void>> {
    const user = await UserModel.findOne({
      where: { sid: studentId },
      relations: ['organizationUser', 'courses'],
    });

    const professorId: number = (req.user as { userId: number }).userId;
    const { organizationUser } = await UserModel.findOne({
      where: { id: professorId },
      relations: ['organizationUser'],
    });

    const organizationId = organizationUser.organizationId;

    if (!user) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'User with this student id is not found' });
      return;
    }

    if (user.id === professorId) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'You cannot add yourself to this course' });
      return;
    }

    if (user.organizationUser.organizationId !== organizationId) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'User is not in the same organization' });
      return;
    }

    const course = await CourseModel.findOne({ id: courseId });

    await this.courseService
      .addStudentToCourse(course, user)
      .then((resp) => {
        if (resp) {
          res
            .status(HttpStatus.OK)
            .send({ message: 'User is added to this course' });
        } else {
          res.status(HttpStatus.BAD_REQUEST).send({
            message:
              'User cannot be added to course. Please check if the user is already in the course',
          });
        }
      })
      .catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
      });
    return;
  }
}
