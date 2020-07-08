import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  HttpException,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import {
  CreateQuestionResponse,
  GetQuestionResponse,
  QuestionStatusKeys,
  CreateQuestionParams,
  UpdateQuestionResponse,
  UpdateQuestionParams,
} from '@template/common';
import { Queue } from '../queue/queue.entity';
import { Connection } from 'typeorm';
import { Question } from './question.entity';
import { User } from '../profile/user.entity';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QuestionController {
  constructor(private connection: Connection) {}

  @Get(':questionId')
  async getQuestion(
    @Param('questionId') questionId: number,
  ): Promise<GetQuestionResponse> {
    const question = await Question.findOne(questionId, {
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
  ): Promise<CreateQuestionResponse> {
    const { text, questionType, queueId } = body;
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
      throw new NotFoundException();
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
    @Param('questionId') questionId: number,
    @Body() body: UpdateQuestionParams,
  ): Promise<UpdateQuestionResponse> {
    const { text, questionType } = body; // Question: Do we want to take in the whole question as a param?
    // TODO: Check that the question_id belongs to the user or a TA that is currently helping with the given queue_id
    // TODO: Use user type to dertermine wether or not we should include the text in the response
    let question = await Question.findOne({
      where: { id: questionId },
      relations: ['creator'],
    });
    if (question === undefined) {
      throw new NotFoundException();
    }
    question = Object.assign(question, { text, questionType });
    await question.save();
    return question;
  }
}
