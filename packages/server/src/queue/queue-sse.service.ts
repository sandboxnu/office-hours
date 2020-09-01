import { Injectable } from '@nestjs/common';
import { SSEService } from 'sse/sse.service';
import { QueueService } from './queue.service';
import { Response } from 'express';
import { throttle } from 'lodash';
import { Role } from '@template/common';

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
  updateQuestions = throttle(
    async (queueId: number) => {
      try {
        if (queueId) {
          const questions = await this.queueService.getQuestions(queueId);
          if (questions) {
            this.sseService.sendEvent(idToRoom(queueId), ({ role, userId }) => {
              return {
                questions: this.queueService.anonymizeQuestions(
                  questions,
                  userId,
                  role,
                ),
              };
            });
          }
        }
      } catch (e) {}
    },
    1000,
    {
      leading: false,
      trailing: true,
    },
  );

  updateQueue = throttle(
    async (queueId: number) => {
      try {
        const queue = await this.queueService.getQueue(queueId);
        if (queue) {
          this.sseService.sendEvent(idToRoom(queueId), () => {
            return { queue: queue };
          });
        }
      } catch (e) {}
    },
    1000,
    {
      leading: false,
      trailing: true,
    },
  );
}
