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
  Res,
} from '@nestjs/common';
import {
  GetQueueResponse,
  ListQuestionsResponse,
  UpdateQueueNotesParams,
  OpenQuestionStatus,
} from '@template/common';
import { Connection, In } from 'typeorm';
import { Response } from 'express';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { QuestionModel } from '../question/question.entity';
import { QueueModel } from './queue.entity';
import { SSEService } from 'sse/sse.service';

@Controller('queues')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(private connection: Connection, private sseService: SSEService) {}

  @Get(':queueId')
  async getQueue(@Param('queueId') queueId: number): Promise<GetQueueResponse> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });

    const questions = await QuestionModel.find({ where: { queueId } });

    queue.questions = questions;
    return queue;
  }

  @Get(':queueId/questions')
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
  async updateQueue(
    @Param('queueId') queueId: number,
    @Body() body: UpdateQueueNotesParams,
    // TODO: Add TA/Prof protection on endpoint
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

  // Endpoint for frontend to receive server-sent events about this queue
  @Get(':queueId/sse')
  sendEvent(@Param('queueId') queueId: string, @Res() res: Response): void {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders();

    this.sseService.subscribeClient(`q-${queueId}`, res);
  }
}
