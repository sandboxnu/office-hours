import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QueueModel } from './queue.entity';
import { SSEService } from 'sse/sse.service';
import { QueueService } from './queue.service';
import { Response } from 'express';
import { throttle } from 'lodash';

const idToRoom = (queueId: number) => `q-${queueId}`;
/**
 * Handle sending queue sse events
 */
@Injectable()
export class QueueSSEService {
  constructor(
    private queueService: QueueService,
    private sseService: SSEService,
  ) {}

  subscribeClient(queueId: number, res: Response): void {
    this.sseService.subscribeClient(idToRoom(queueId), res);
  }

  private async unthrottledUpdateQuestions(queueId: number) {
    this.sseService.sendEvent(
      idToRoom(queueId),
      await this.queueService.getQuestions(queueId),
    );
  }

  // Send event with new questions, but no more than once a second
  updateQuestions = throttle(this.unthrottledUpdateQuestions, 1000, {
    leading: false,
    trailing: true,
  });
}
