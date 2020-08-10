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
} from '@template/common';
import { Connection } from 'typeorm';
import { Response } from 'express';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { QueueModel } from './queue.entity';
import { QueueService } from './queue.service';
import { QueueSSEService } from './queue-sse.service';

@Controller('queues')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class QueueController {
  constructor(
    private connection: Connection,
    private queueSSEService: QueueSSEService,
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
  sendEvent(@Param('queueId') queueId: number, @Res() res: Response): void {
    res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    this.queueSSEService.subscribeClient(queueId, res);
  }
}
