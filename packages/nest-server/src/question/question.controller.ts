import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  HttpException,
  Patch,
} from '@nestjs/common';
import {
  CreateQuestionResponse,
  GetQuestionResponse,
  QuestionStatusKeys,
  CreateQuestionParams,
  UpdateQuestionResponse,
  UpdateQuestionParams,
} from '@template/common';
import { Queue } from 'src/queue/queue.entity';
import { Connection } from 'typeorm';
import { Question } from './question.entity';
import { User } from 'src/profile/user.entity';
import { Http2ServerResponse } from 'http2';

@Controller('questions')
export class QuestionController {
  constructor(private connection: Connection) {}

  @Get(':questionId')
  async getQuestion(
    @Param('questionId') questionId,
  ): Promise<GetQuestionResponse> {
    const question = await Question.findOne(questionId, {
      relations: ['creator', 'taHelped'],
    });

    return question;
  }

  @Post()
  async createQuestion(
    @Body() body,
  ): Promise<CreateQuestionResponse | HttpException> {
    const { text, questionType, queueId } = body as CreateQuestionParams;
    // TODO: Remove this once we implemntent user authentication
    const DEFAULT_USER = await User.create({
      id: 42,
      username: 'test_user',
      email: 'test_user@husky.neu.edu',
      name: 'Test User',
      photoURL: 'www.photoURL.com',
    }).save();
    const queueSize = await Queue.count({
      where: { id: queueId },
    });
    // Check that the queue exists
    if (queueSize === 0) {
      return new HttpException('Queue not found', 404);
    }
    // TODO: Check that the user posting the question is a member of the course

    const question = await Question.create({
      queueId: queueId,
      creator: DEFAULT_USER,
      text,
      questionType,
      status: QuestionStatusKeys.Drafting,
    }).save();

    question.creator = DEFAULT_USER;
    return question;
  }

  @Patch(':questionId')
  async updateQuestion(
    @Param('questionId') questionId,
    @Body() body,
  ): Promise<UpdateQuestionResponse | HttpException> {
    const { text, questionType } = body as UpdateQuestionParams; // Question: Do we want to take in the whole question as a param?
    // TODO: Check that the question_id belongs to the user or a TA that is currently helping with the given queue_id
    // TODO: Use user type to dertermine wether or not we should include the text in the response
    let question = await Question.findOne({
      where: { id: questionId },
      relations: ['creator'],
    });
    if (question === undefined) {
      return new HttpException('Question not found', 404);
    }
    question = Object.assign(question, body);
    await question.save();
    return question;
  }
}
