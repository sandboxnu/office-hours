import { Injectable } from '@nestjs/common';
import { SSEService } from 'sse/sse.service';
import { QueueService } from './queue.service';
import { Response } from 'express';
import { throttle, update } from 'lodash';
import { Role, SSEQueueResponse } from '@koh/common';
import { updateFunctionDeclaration } from 'typescript';
import { send } from 'process';

type QueueClientMetadata = { userId: number; role: Role };

const idToRoom = (queueId: number) => `q-${queueId}`;
/**
 * Handle sending queue sse events
 */
@Injectable()
export class QueueSSEService {
  constructor(
    private queueService: QueueService,
    private sseService: SSEService<QueueClientMetadata>,
  ) {}

  subscribeClient(
    queueId: number,
    res: Response,
    metadata: QueueClientMetadata,
  ): void {
    this.sseService.subscribeClient(idToRoom(queueId), { res, metadata });
  }

  // Send event with new questions, but no more than once a second
  updateQuestions = this.throttleUpdate(async (queueId) => {
    const questions = await this.queueService.getQuestions(queueId);
    if (questions) {
      this.sendToRoom(queueId, ({ role, userId }) => ({
        questions: this.queueService.anonymizeQuestions(
          questions,
          userId,
          role,
        ),
      }));
    }
  });

  updateQueue = this.throttleUpdate(async (queueId) => {
    const queue = await this.queueService.getQueue(queueId);
    if (queue) {
      this.sendToRoom(queueId, () => ({ queue }));
    }
  });

  private sendToRoom(
    queueId: number,
    data: (metadata: QueueClientMetadata) => SSEQueueResponse,
  ) {
    this.sseService.sendEvent(idToRoom(queueId), data);
  }

  private throttleUpdate(updateFunction: (queueId: number) => Promise<void>) {
    return throttle(
      async (queueId: number) => {
        try {
          await updateFunction(queueId);
        } catch (e) {}
      },
      1000,
      {
        leading: false,
        trailing: true,
      },
    );
  }
}
