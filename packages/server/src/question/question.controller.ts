import {
  ClosedQuestionStatus,
  CreateQuestionParams,
  CreateQuestionResponse,
  ERROR_MESSAGES,
  GetQuestionResponse,
  HelpQuestionsParams,
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
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import {
  NotificationService,
  NotifMsgs,
} from '../notification/notification.service';
import { Roles } from '../profile/roles.decorator';
import { UserCourseModel } from '../profile/user-course.entity';
import { User, UserId } from '../profile/user.decorator';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionGroupModel } from './question-group.entity';
import { QuestionRolesGuard } from './question-role.guard';
import { QuestionModel } from './question.entity';
import { QuestionService } from './question.service';

// NOTE: FIXME: EVERY REQUEST INTO QUESTIONCONTROLLER REQUIRES THE BODY TO HAVE A
// FIELD questionId OR queueId! If not, stupid weird untraceable bugs will happen
// and you will lose a lot of development time
@Controller('questions')
@UseGuards(JwtAuthGuard, QuestionRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(
    private connection: Connection,
    private notifService: NotificationService,
    private questionService: QuestionService,
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
    const { text, questionType, groupable, queueId, force } = body;

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
      groupable,
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
      await this.questionService.validateNotHelpingOther(body.status, userId);
      return await this.questionService.changeStatus(
        body.status,
        question,
        userId,
      );
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

  @Post('help')
  @Roles(Role.TA, Role.PROFESSOR)
  async helpQuestions(
    @Body() body: HelpQuestionsParams,
    @UserId() instructorId: number,
  ): Promise<void> {
    const questions = await QuestionModel.find({
      where: {
        id: In(body.questionIds),
      },
      relations: ['taHelped', 'creator'],
    });

    await this.questionService.validateNotHelpingOther(
      QuestionStatusKeys.Helping,
      instructorId,
    );

    for (const question of questions) {
      await this.questionService.changeStatus(
        QuestionStatusKeys.Helping,
        question,
        instructorId,
      );
    }

    const queue = await QueueModel.findOne({
      where: {
        id: body.queueId,
      },
    });

    const creatorUserCourse = await UserCourseModel.findOne({
      where: {
        courseId: queue.courseId,
        userId: instructorId,
      },
    });

    const _newGroup = await QuestionGroupModel.create({
      creatorId: creatorUserCourse.id, // this should be usercourse id
      queueId: body.queueId,
      questions: questions,
    }).save();

    // TODO: return newGroup???
    return;
  }

  @Patch('resolveGroup/:group_id')
  @Roles(Role.TA, Role.PROFESSOR)
  async resolveGroup(
    @Param('group_id') groupId: number,
    @UserId() instructorId: number,
  ): Promise<void> {
    const group = await QuestionGroupModel.findOne({
      where: {
        id: groupId,
      },
      relations: ['questions', 'questions.taHelped', 'questions.creator'],
    });

    for (const question of group.questions) {
      // only resolve q's that weren't requeued/can't find
      if (question.status === OpenQuestionStatus.Helping) {
        await this.questionService.changeStatus(
          QuestionStatusKeys.Resolved,
          question,
          instructorId,
        );
      }
    }

    // TODO: return type??
    // this is in question controller bc its using question service, should it be queue controller?
    return;
  }
}
