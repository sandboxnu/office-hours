import {
  ClosedQuestionStatus,
  CreateQuestionParams,
  CreateQuestionResponse,
  ERROR_MESSAGES,
  GetQuestionResponse,
  LimboQuestionStatus,
  OpenQuestionStatus,
  QuestionStatusKeys,
  Role,
  UpdateQuestionParams,
  UpdateQuestionResponse,
} from '@koh/common';
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
import { Connection, In } from 'typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { Roles } from '../decorators/roles.decorator';
import { UserCourseModel } from '../profile/user-course.entity';
import { User, UserId } from '../decorators/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionRolesGuard } from '../guards/question-role.guard';
import { QuestionModel } from './question.entity';

@Controller('questions')
@UseGuards(JwtAuthGuard, QuestionRolesGuard)
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
  @Roles(Role.STUDENT)
  async createQuestion(
    @Body() body: CreateQuestionParams,
    @User() user: UserModel,
  ): Promise<CreateQuestionResponse> {
    const { text, questionType, queueId, force } = body;

    const queue = await QueueModel.findOne({
      where: { id: queueId },
      relations: ['staffList'],
    });

    if (!queue) {
      throw new NotFoundException(
        ERROR_MESSAGES.questionController.createQuestion.invalidQueue,
      );
    }

    if (!queue.allowQuestions) {
      throw new BadRequestException(
        ERROR_MESSAGES.questionController.createQuestion.noNewQuestions,
      );
    }
    if (!(await queue.checkIsOpen())) {
      throw new BadRequestException(
        ERROR_MESSAGES.questionController.createQuestion.closedQueue,
      );
    }

    const previousUserQuestion = await QuestionModel.findOne({
      where: {
        creatorId: user.id,
        status: In(Object.values(OpenQuestionStatus)),
      },
    });

    if (!!previousUserQuestion) {
      if (force) {
        previousUserQuestion.status = ClosedQuestionStatus.ConfirmedDeleted;
        await previousUserQuestion.save();
      } else {
        throw new BadRequestException(
          ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime,
        );
      }
    }

    const question = await QuestionModel.create({
      queueId: queueId,
      creator: user,
      text,
      questionType,
      status: QuestionStatusKeys.Drafting,
      createdAt: new Date(),
      isOnline: true,
    }).save();

    return question;
  }

  @Patch(':questionId')
  @Roles(Role.STUDENT, Role.TA, Role.PROFESSOR)
  // TODO: Use queueRole decorator, but we need to fix its performance first
  async updateQuestion(
    @Param('questionId') questionId: number,
    @Body() body: UpdateQuestionParams,
    @UserId() userId: number,
  ): Promise<UpdateQuestionResponse> {
    let question = await QuestionModel.findOne({
      where: { id: questionId },
      relations: ['creator', 'queue', 'taHelped'],
    });
    if (question === undefined) {
      throw new NotFoundException();
    }

    const isCreator = userId === question.creatorId;

    if (isCreator) {
      // Fail if student tries an invalid status change
      if (body.status && !question.changeStatus(body.status, Role.STUDENT)) {
        throw new UnauthorizedException(
          ERROR_MESSAGES.questionController.updateQuestion.fsmViolation(
            'Student',
            question.status,
            body.status,
          ),
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
          ERROR_MESSAGES.questionController.updateQuestion.taOnlyEditQuestionStatus,
        );
      }
      const oldStatus = question.status;
      const newStatus = body.status;
      // If the taHelped is already set, make sure the same ta updates the status
      if (question.taHelped?.id !== userId) {
        if (oldStatus === OpenQuestionStatus.Helping) {
          throw new UnauthorizedException(
            ERROR_MESSAGES.questionController.updateQuestion.otherTAHelping,
          );
        }
        if (oldStatus === ClosedQuestionStatus.Resolved) {
          throw new UnauthorizedException(
            ERROR_MESSAGES.questionController.updateQuestion.otherTAResolved,
          );
        }
      }

      const isAlreadyHelpingOne =
        (await QuestionModel.count({
          where: {
            taHelpedId: userId,
            status: OpenQuestionStatus.Helping,
          },
        })) === 1;
      if (isAlreadyHelpingOne && newStatus === OpenQuestionStatus.Helping) {
        throw new BadRequestException(
          ERROR_MESSAGES.questionController.updateQuestion.taHelpingOther,
        );
      }

      const validTransition = question.changeStatus(newStatus, Role.TA);
      if (!validTransition) {
        throw new UnauthorizedException(
          ERROR_MESSAGES.questionController.updateQuestion.fsmViolation(
            'TA',
            question.status,
            body.status,
          ),
        );
      }

      // Set TA as taHelped when the TA starts helping the student
      if (
        oldStatus !== OpenQuestionStatus.Helping &&
        newStatus === OpenQuestionStatus.Helping
      ) {
        question.taHelped = await UserModel.findOne(userId);
        question.helpedAt = new Date();

        // Set firstHelpedAt if it hasn't already
        if (!question.firstHelpedAt) {
          question.firstHelpedAt = question.helpedAt;
        }
        await this.notifService.notifyUser(
          question.creator.id,
          NotifMsgs.queue.TA_HIT_HELPED(question.taHelped.name),
        );
      }
      if (newStatus in ClosedQuestionStatus) {
        question.closedAt = new Date();
      }
      await question.save();
      return question;
    } else {
      throw new UnauthorizedException(
        ERROR_MESSAGES.questionController.updateQuestion.loginUserCantEdit,
      );
    }
  }

  @Post(':questionId/notify')
  @Roles(Role.TA, Role.PROFESSOR)
  async notify(@Param('questionId') questionId: number): Promise<void> {
    const question = await QuestionModel.findOne(questionId, {
      relations: ['queue'],
    });

    if (question.status === LimboQuestionStatus.CantFind) {
      await this.notifService.notifyUser(
        question.creatorId,
        NotifMsgs.queue.ALERT_BUTTON,
      );
    } else if (question.status === LimboQuestionStatus.TADeleted) {
      await this.notifService.notifyUser(
        question.creatorId,
        NotifMsgs.queue.REMOVED,
      );
    }
  }
}
