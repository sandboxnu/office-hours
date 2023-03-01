import {
  CreateAsyncQuestions,
  ERROR_MESSAGES,
  Role,
  AsyncQuestion,
  asyncQuestionStatus,
  UpdateAsyncQuestions,
} from '@koh/common';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import {
//   NotificationService,
//   NotifMsgs,
// } from '../notification/notification.service';
// import { Response } from 'express';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { UserModel } from '../profile/user.entity';
import { AsyncQuestionModel } from './asyncQuestion.entity';
import { asyncQuestionService } from './asyncQuestion.service';
import { CourseModel } from 'course/course.entity';
@Controller('asyncQuestions')
@UseGuards(JwtAuthGuard)
export class asyncQuestionController {
  constructor(
    private connection: Connection,
    private questionService: asyncQuestionService,
  ) {}

  @Post(':cid')
  @Roles(Role.STUDENT)
  async createQuestion(
    @Body() body: CreateAsyncQuestions,
    @Param('cid') cid: number,
    @User() user: UserModel,
  ): Promise<any> {
    // const { text, questionType, groupable, queueId, force } = body;

    const c = await CourseModel.findOne({
      where: { id: cid },
    });

    if (!c) {
      throw new NotFoundException(
        ERROR_MESSAGES.questionController.createQuestion.invalidQueue,
      );
    }
    //add functionality to check whether they have already asked questions

    // const previousUserQuestions = await QuestionModel.find({
    //   relations: ['queue'],
    //   where: {
    //     creatorId: user.id,
    //     status: In(Object.values(OpenQuestionStatus)),
    //   },
    // });

    // const previousCourseQuestion = previousUserQuestions.find(
    //   question => question.queue.courseId === queue.courseId,
    // );

    // if (!!previousCourseQuestion) {
    //   if (force) {
    //     previousCourseQuestion.status = ClosedQuestionStatus.ConfirmedDeleted;
    //     await previousCourseQuestion.save();
    //   } else {
    //     throw new BadRequestException(
    //       ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime,
    //     );
    //   }
    // }

    try {
      const question = await AsyncQuestionModel.create({
        courseId: cid,
        creator: user,
        creatorId: user.id,
        course: c,
        questionText: body.questionText,
        questionType: 'default',
        status: asyncQuestionStatus.Waiting,
        createdAt: new Date(),
      }).save();
      return question;
    } catch (err) {
      console.error(err);
      throw new HttpException(
        ERROR_MESSAGES.questionController.saveQError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Patch(':questionId')
  async updateQuestion(
    @Param('questionId') questionId: number,
    @Body() body: UpdateAsyncQuestions,
  ): Promise<AsyncQuestion> {
    const question = await AsyncQuestionModel.findOne({
      where: { id: questionId },
      relations: ['creator'],
    });
    if (question === undefined) {
      throw new NotFoundException();
    }

    // const isCreator = question.creator.id=== question.creatorId;

    // if (isCreator) {
    //   // Fail if student tries an invalid status change
    //   if (body.status && !question.changeStatus(body.status, Role.STUDENT)) {
    //     throw new UnauthorizedException(
    //       ERROR_MESSAGES.questionController.updateQuestion.fsmViolation(
    //         'Student',
    //         question.status,
    //         body.status,
    //       ),
    //     );
    //   }
    //   question = Object.assign(question, body);
    //   try {
    //     await question.save();
    //   } catch (err) {
    //     console.error(err);
    //     throw new HttpException(
    //       ERROR_MESSAGES.questionController.saveQError,
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }
    //   return question;
    // }

    //If not creator, check if user is TA/PROF of course of question

    Object.assign(question, body);
    question.closedAt = new Date();
    question.save();
    return question;
  }
}
