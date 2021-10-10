import { QuestionStatus, QuestionType, Role } from '@koh/common';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionGroupModel } from './question-group.entity';
export declare class QuestionModel extends BaseEntity {
    id: number;
    queue: QueueModel;
    queueId: number;
    text: string;
    creator: UserModel;
    creatorId: number;
    taHelped: UserModel;
    taHelpedId: number;
    createdAt: Date;
    firstHelpedAt: Date;
    helpedAt: Date;
    closedAt: Date;
    questionType: QuestionType;
    status: QuestionStatus;
    location: string;
    isOnline: boolean;
    groupable: boolean;
    group: QuestionGroupModel;
    groupId: number;
    changeStatus(newStatus: QuestionStatus, role: Role): boolean;
    static inQueueWithStatus(queueId: number, statuses: QuestionStatus[]): SelectQueryBuilder<QuestionModel>;
    static waitingInQueue(queueId: number): SelectQueryBuilder<QuestionModel>;
}
