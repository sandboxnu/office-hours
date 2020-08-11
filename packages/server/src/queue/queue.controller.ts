import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ClosedQuestionStatus,
  GetQueueResponse,
  ListQuestionsResponse,
  UpdateQueueNotesParams,
  Role,
  OpenQuestionStatus,
} from '@template/common';
import { Connection, In, Not } from 'typeorm';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { QuestionModel } from '../question/question.entity';
import { QueueModel } from './queue.entity';
import { QueueRolesGuard } from './queue-role.guard';
import { Roles } from '../profile/roles.decorator';

@Controller('queues')
@UseGuards(JwtAuthGuard, QueueRolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(private connection: Connection) {}

  @Get(':queueId')
  @Roles(Role.TA, Role.PROFESSOR, Role.STUDENT)
  async getQueue(@Param('queueId') queueId: string): Promise<GetQueueResponse> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });

    const questions = await QuestionModel.find({ where: { queueId } });

    queue.questions = questions;
    return queue;
  }

  @Get(':queueId/questions')
  @Roles(Role.TA, Role.PROFESSOR, Role.STUDENT)
  async getQuestions(
    @Param('queueId') queueId: number,
  ): Promise<ListQuestionsResponse> {
    // todo: need a way to return different data, if TA vs. student hits endpoint.
    // for now, just return the student response
    const queueSize = await QueueModel.count({
      where: { id: queueId },
    });
    // Check that the queue exists
    if (queueSize === 0) {
      throw new NotFoundException();
    }
    return QuestionModel.openInQueue(queueId)
      .leftJoinAndSelect('question.creator', 'creator')
      .leftJoinAndSelect('question.taHelped', 'taHelped')
      .getMany();
  }

  @Patch(':queueId')
  @Roles(Role.TA, Role.PROFESSOR)
  async updateQueue(
    @Param('queueId') queueId: number,
    @Body() body: UpdateQueueNotesParams,
  ): Promise<QueueModel> {
    const queue = await QueueModel.findOne({
      where: { id: queueId },
    });
    if (queue === undefined) {
      throw new NotFoundException();
    }

    queue.notes = body.notes;
    await queue.save();
    return queue;
  }
}
