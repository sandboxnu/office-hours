import { Injectable } from '@nestjs/common';
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

  // Send event with new questions, but no more than once a second
  updateQuestions = throttle(
    async (queueId: number) =>
      this.sseService.sendEvent(
        idToRoom(queueId),
        await this.queueService.getQuestions(queueId),
      ),
    1000,
    {
      leading: false,
      trailing: true,
    },
  );
}
