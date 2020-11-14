/// <reference types="lodash" />
import { Role } from '@koh/common';
import { Response } from 'express';
import { SSEService } from 'sse/sse.service';
import { QueueService } from './queue.service';
declare type QueueClientMetadata = {
    userId: number;
    role: Role;
};
export declare class QueueSSEService {
    private queueService;
    private sseService;
    constructor(queueService: QueueService, sseService: SSEService<QueueClientMetadata>);
    subscribeClient(queueId: number, res: Response, metadata: QueueClientMetadata): void;
    updateQuestions: ((queueId: number) => Promise<void>) & import("lodash").Cancelable;
    updateQueue: ((queueId: number) => Promise<void>) & import("lodash").Cancelable;
    private sendToRoom;
    private throttleUpdate;
}
export {};
