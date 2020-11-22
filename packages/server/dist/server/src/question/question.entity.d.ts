import { QuestionStatus, QuestionType, Role } from '@koh/common';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { QueueModel } from '../queue/queue.entity';
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
    changeStatus(newStatus: QuestionStatus, role: Role): boolean;
    static openInQueue(queueId: number): SelectQueryBuilder<QuestionModel>;
}