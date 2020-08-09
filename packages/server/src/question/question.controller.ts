import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ClosedQuestionStatus,
  CreateQuestionParams,
  CreateQuestionResponse,
  GetQuestionResponse,
  OpenQuestionStatus,
  QuestionStatusKeys,
  Role,
  UpdateQuestionParams,
  UpdateQuestionResponse,
} from '@template/common';
import { Connection, In } from 'typeorm';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { UserCourseModel } from '../profile/user-course.entity';
import { User, UserId } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionModel } from './question.entity';

@Controller('questions')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(
    private connection: Connection,
    private notifService: NotificationService,
  ) {}

  @Get(':questionId')
  async getQuestion(
    @Param('questionId') questionId: number,
  ): Promise<GetQuestionResponse> {
    const question = await QuestionModel.findOne(questionId, {
      relations: ['creator', 'taHelped'],
    });

    if (question === undefined) {
      throw new NotFoundException();
    }
    return question;
  }

  @Post()
  async createQuestion(
    @Body() body: CreateQuestionParams,
    @User() user: UserModel,
  ): Promise<CreateQuestionResponse> {
    const { text, questionType, queueId } = body;

    const queue = await QueueModel.findOne({
      where: { id: queueId },
    });

    if (!queue) {
      throw new NotFoundException();
    }

    // TODO: think of a neat way to make this abstracted
    const isUserInCourse =
      (await UserCourseModel.count({
        where: {
          role: Role.STUDENT,
          courseId: queue.courseId,
          userId: user.id,
        },
      })) === 1;

    if (!isUserInCourse) {
      throw new UnauthorizedException(
        "Can't post question to course you're not in!",
      );
    }

    const userAlreadyHasOpenQuestion =
      (await QuestionModel.count({
        where: {
          creatorId: user.id,
          status: In(Object.values(OpenQuestionStatus)),
        },
      })) > 0;

    if (userAlreadyHasOpenQuestion) {
      throw new BadRequestException(
        "You can't create more than one question fuck ligma stanley",
      );
    }
    const question = await QuestionModel.create({
      queueId: queueId,
      creator: user,
      text,
      questionType,
      status: QuestionStatusKeys.Drafting,
    }).save();

    return question;
  }

  @Patch(':questionId')
  async updateQuestion(
    @Param('questionId') questionId: number,
    @Body() body: UpdateQuestionParams,
    @UserId() userId: number,
  ): Promise<UpdateQuestionResponse> {
    // TODO: Check that the question_id belongs to the user or a TA that is currently helping with the given queue_id
    // TODO: Use user type to dertermine wether or not we should include the text in the response
    let question = await QuestionModel.findOne({
      where: { id: questionId },
      relations: ['creator', 'queue', 'taHelped'],
    });
    if (question === undefined) {
      throw new NotFoundException();
    }

    const isCreator = userId === question.creatorId;

    if (isCreator) {
      // Creator can always edit
      if (body.status === OpenQuestionStatus.Helping) {
        throw new UnauthorizedException(
          'Students cannot mark question as helping',
        );
      }
      if (body.status === ClosedQuestionStatus.Resolved) {
        throw new UnauthorizedException(
          'Students cannot mark question as resolved',
        );
      }
      question = Object.assign(question, body);
      await question.save();
      return question;
    }

    // If not creator, check if user is TA/PROF of course of question
    const isTaOrProf =
      (await UserCourseModel.count({
        where: {
          userId,
          courseId: question.queue.courseId,
          role: In([Role.TA, Role.PROFESSOR]),
        },
      })) > 0;

    if (isTaOrProf) {
      if (Object.keys(body).length !== 1 || Object.keys(body)[0] !== 'status') {
        throw new UnauthorizedException(
          'TA/Professors can only edit question status',
        );
      }

      // If the taHelped is already set, make sure the same ta updates the status
      if (question.taHelped?.id !== userId) {
        if (question.status === OpenQuestionStatus.Helping) {
          throw new UnauthorizedException(
            'Another TA is currently helping with this question',
          );
        }
        if (question.status === ClosedQuestionStatus.Resolved) {
          throw new UnauthorizedException(
            'Another TA has already resolved this question',
          );
        }
      }
      // Set TA as taHelped when the TA starts helping the student
      if (
        question.status !== OpenQuestionStatus.Helping &&
        body.status === OpenQuestionStatus.Helping
      ) {
        question.taHelped = await UserModel.findOne(userId);
        await this.notifService.notifyUser(
          question.creator.id,
          NotifMsgs.queue.TA_HIT_HELPED(question.taHelped.name),
        );
      }
      question = Object.assign(question, body);
      await question.save();
      return question;
    } else {
      throw new UnauthorizedException(
        'Logged-in user does not have edit access',
      );
    }
  }

  @Post(':questionId/notify')
  async notify(
    @Param('questionId') questionId: number,
    @UserId() userId: number,
  ): Promise<void> {
    const question = await QuestionModel.findOne(questionId, {
      relations: ['queue'],
    });

    const isUserTAOfCourse =
      (await UserCourseModel.count({
        where: {
          // TODO: somehow store and check that the notifying TA is the one helping?
          role: Role.TA,
          courseId: question.queue.courseId,
          userId: userId,
        },
      })) === 1;

    if (!isUserTAOfCourse) {
      throw new UnauthorizedException('Only TA can send alerts');
    }

    this.notifService.notifyUser(
      question.creatorId,
      NotifMsgs.queue.ALERT_BUTTON,
    );
  }
}
