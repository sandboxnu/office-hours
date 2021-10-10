import { QuestionStatus } from '@koh/common';
import { NotificationService } from 'notification/notification.service';
import { Connection } from 'typeorm';
import { QuestionModel } from './question.entity';
export declare class QuestionService {
    private connection;
    private notifService;
    constructor(connection: Connection, notifService: NotificationService);
    changeStatus(status: QuestionStatus, question: QuestionModel, userId: number): Promise<QuestionModel>;
    validateNotHelpingOther(newStatus: QuestionStatus, userId: number): Promise<void>;
}
