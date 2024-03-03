import {
  CreateAsyncQuestions,
  ERROR_MESSAGES,
  Role,
  AsyncQuestion,
  asyncQuestionStatus,
  UpdateAsyncQuestions,
  sendEmailAsync,
  asyncQuestionEventType,
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
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { UserModel } from '../profile/user.entity';
import { AsyncQuestionModel } from './asyncQuestion.entity';
import { asyncQuestionService } from './asyncQuestion.service';
import { CourseModel } from 'course/course.entity';
import { MailService } from 'mail/mail.service';
import { Response } from 'express';
import { AsyncQuestionVotesModel } from './asyncQuestionVotes.entity';

@Controller('asyncQuestions')
@UseGuards(JwtAuthGuard)
export class asyncQuestionController {
  constructor(
    private mailService: MailService,
    private questionService: asyncQuestionService,
  ) {}

  @Post(':qid/:vote')
  @Roles(Role.STUDENT, Role.TA, Role.PROFESSOR)
  async voteQuestion(
    @Param('qid') qid: number,
    @Param('vote') vote: number,
    @User() user: UserModel,
    @Res() res: Response,
  ): Promise<AsyncQuestion> {
    const thisUserThisQuestionVote = await AsyncQuestionVotesModel.findOne({
      where: { userId: user.id, questionId: qid },
    });

    const hasVoted = thisUserThisQuestionVote !== undefined;
    const sumVotes = thisUserThisQuestionVote?.vote ?? 0;

    const newValue = sumVotes + vote;

    const canVote = newValue <= 1 && newValue >= -1;

    if (canVote) {
      if (hasVoted) {
        thisUserThisQuestionVote.vote = newValue;
        await thisUserThisQuestionVote.save();
      } else {
        const vote = new AsyncQuestionVotesModel();
        vote.user = user;
        vote.userId = user.id;
        vote.questionId = qid;
        vote.vote = newValue;
        await vote.save();
      }
    }
    const question = await AsyncQuestionModel.findOne({
      where: { id: qid },
    });

    res
      .status(200)
      .send({ question: question, vote: thisUserThisQuestionVote?.vote ?? 0 });
    return;
  }

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

    //check whether there are images to be added
    try {
      const question = await AsyncQuestionModel.create({
        courseId: cid,
        creator: user,
        creatorId: user.id,
        course: c,
        questionAbstract: body.questionAbstract,
        questionText: body.questionText || null,
        answerText: body.answerText || null,
        aiAnswerText: body.aiAnswerText,
        questionTypes: body.questionTypes,
        status: asyncQuestionStatus.Waiting,
        visible: body.visible || false,
        createdAt: new Date(),
      }).save();
      // const professors = await UserCourseModel.findOne({
      //   where: {
      //     role: Role.PROFESSOR,
      //   },
      // });
      // console.log(professors);
      // const post: sendEmailAsync = {
      //   receiver: professors.user.email,
      //   subject: 'UBC helpme Async question created',
      //   type: asyncQuestionEventType.created,
      // };
      // this.mailService.sendEmail(post);
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
      relations: ['creator', 'images'],
    });
    if (question === undefined) {
      throw new NotFoundException();
    }

    question.aiAnswerText = body.aiAnswerText;
    question.answerText = body.answerText;

    //If not creator, check if user is TA/PROF of course of question

    Object.assign(question, body);
    question.closedAt = new Date();
    question.save().then(async () => {
      //send notification
      const receiver = await UserModel.findOne({
        where: {
          id: question.creatorId,
        },
      });
      if (!receiver) {
        throw NotFoundException;
      }
      const post: sendEmailAsync = {
        receiver: receiver.email,
        subject: 'UBC helpme Async question status change',
        type: asyncQuestionEventType.deleted,
      };
      if (body.status === asyncQuestionStatus.Resolved) {
        post.type = asyncQuestionEventType.answered;
        this.mailService.sendEmail(post);
      } else if (body.status === asyncQuestionStatus.TADeleted) {
        post.type = asyncQuestionEventType.deleted;
        this.mailService.sendEmail(post);
      }
    });
    return question;
  }
}
//delete questions currently not implemented.

// @Delete(':questionId')
// async deleteQuestion(
//     @Param('questionId') questionId: number,
//     @Body() body: UpdateAsyncQuestions,
//   ): Promise<AsyncQuestion> {
//     const question = await AsyncQuestionModel.findOne({
//       where: { id: questionId },
//       relations: ['creator', 'images'],
//     });
//     if (!question) {
//       throw new NotFoundException();
//     }

//     const receiver = await UserModel.findOne({
//       where: {
//         id: question.creatorId,
//       },
//     });
//     if (!receiver) {
//       throw NotFoundException;
//     }

//     const post: sendEmailAsync = {
//       receiver: receiver.email,
//       subject: 'UBC helpme Async question status change',
//       type: asyncQuestionEventType.deleted,
//     };
//     this.mailService.sendEmail(post);

//     return question;
//   }

// }
