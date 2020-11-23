import { ListQuestionsResponse, Role } from '@koh/common';
import { Connection } from 'typeorm';
import { QueueModel } from './queue.entity';
export declare class QueueService {
    private connection;
    constructor(connection: Connection);
    getQueue(queueId: number): Promise<QueueModel>;
    getQuestions(queueId: number): Promise<ListQuestionsResponse>;
    personalizeQuestions(queueId: number, questions: ListQuestionsResponse, userId: number, role: Role): Promise<ListQuestionsResponse>;
}
