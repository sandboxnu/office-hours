import { Connection } from 'typeorm';
import { QueueModel } from './queue.entity';
import { ListQuestionsResponse, Role } from '@koh/common';
export declare class QueueService {
    private connection;
    constructor(connection: Connection);
    getQueue(queueId: number): Promise<QueueModel>;
    getQuestions(queueId: number): Promise<ListQuestionsResponse>;
    anonymizeQuestions(questions: ListQuestionsResponse, userId: number, role: Role): ListQuestionsResponse;
}
