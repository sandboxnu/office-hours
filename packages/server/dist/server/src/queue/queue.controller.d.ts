import { GetQueueResponse, ListQuestionsResponse, Role, UpdateQueueParams } from '@koh/common';
import { Response } from 'express';
import { Connection } from 'typeorm';
import { QueueSSEService } from './queue-sse.service';
import { QueueModel } from './queue.entity';
import { QueueService } from './queue.service';
import { QueueCleanService } from './queue-clean/queue-clean.service';
export declare class QueueController {
    private connection;
    private queueSSEService;
    private queueCleanService;
    private queueService;
    constructor(connection: Connection, queueSSEService: QueueSSEService, queueCleanService: QueueCleanService, queueService: QueueService);
    getQueue(queueId: number): Promise<GetQueueResponse>;
    getQuestions(queueId: number, role: Role, userId: number): Promise<ListQuestionsResponse>;
    updateQueue(queueId: number, body: UpdateQueueParams): Promise<QueueModel>;
    cleanQueue(queueId: number): Promise<void>;
    sendEvent(queueId: number, role: Role, userId: number, res: Response): void;
}
