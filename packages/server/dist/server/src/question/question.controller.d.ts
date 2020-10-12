import { CreateQuestionParams, CreateQuestionResponse, GetQuestionResponse, UpdateQuestionParams, UpdateQuestionResponse } from '@koh/common';
import { Connection } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { UserModel } from '../profile/user.entity';
export declare class QuestionController {
    private connection;
    private notifService;
    constructor(connection: Connection, notifService: NotificationService);
    getQuestion(questionId: number): Promise<GetQuestionResponse>;
    createQuestion(body: CreateQuestionParams, user: UserModel): Promise<CreateQuestionResponse>;
    updateQuestion(questionId: number, body: UpdateQuestionParams, userId: number): Promise<UpdateQuestionResponse>;
    notify(questionId: number): Promise<void>;
}
