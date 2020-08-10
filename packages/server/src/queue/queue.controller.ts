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
import { QueueService } from './queue.service';

@Controller('queues')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(
    private connection: Connection,
    private sseService: SSEService,
    private queueService: QueueService,
  ) {}

  @Get(':queueId')
  async getQueue(@Param('queueId') queueId: number): Promise<GetQueueResponse> {
    return this.queueService.getQueue(queueId);
  }

  @Get(':queueId/questions')
  async getQuestions(
    @Param('queueId') queueId: number,
  ): Promise<ListQuestionsResponse> {
    return this.queueService.getQuestions(queueId);
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

  // Endpoint to send frontend receive server-sent events when queue changes
  @Get(':queueId/sse')
  sendEvent(@Param('queueId') queueId: string, @Res() res: Response): void {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    this.sseService.subscribeClient(`q-${queueId}`, res);
  }
}
