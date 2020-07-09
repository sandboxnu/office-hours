import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { Queue } from './queue.entity';
import { GetQueueResponse, ListQuestionsResponse } from '@template/common';
import { Question } from '../question/question.entity';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';

@Controller('queues')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(private connection: Connection) {}

  @Get(':queueId')
  async getQueue(@Param('queueId') queueId: string): Promise<GetQueueResponse> {
    return Queue.findOne(queueId, { relations: ['questions'] });
  }

  @Get(':queueId/questions')
  async getQuestions(
    @Param('queueId') queueId: string,
  ): Promise<ListQuestionsResponse> {
    // todo: need a way to return different data, if TA vs. student hits endpoint.
    // for now, just return the student response
    const queueSize = await Queue.count({
      where: { id: queueId },
    });
    // Check that the queue exists
    if (queueSize === 0) {
      throw new NotFoundException();
    }

    return await Question.find({
      where: [
        {
          queueId: queueId,
        },
      ],
      relations: ['creator', 'taHelped'],
    });
  }
}
