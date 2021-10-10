import { CreateQuestionParams, CreateQuestionResponse, GetQuestionResponse, GroupQuestionsParams, UpdateQuestionParams, UpdateQuestionResponse } from '@koh/common';
import { Connection } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { UserModel } from '../profile/user.entity';
import { QuestionService } from './question.service';
export declare class QuestionController {
    private connection;
    private notifService;
    private questionService;
    constructor(connection: Connection, notifService: NotificationService, questionService: QuestionService);
    getQuestion(questionId: number): Promise<GetQuestionResponse>;
    createQuestion(body: CreateQuestionParams, user: UserModel): Promise<CreateQuestionResponse>;
    updateQuestion(questionId: number, body: UpdateQuestionParams, userId: number): Promise<UpdateQuestionResponse>;
    notify(questionId: number): Promise<void>;
    groupQuestions(body: GroupQuestionsParams, instructorId: number): Promise<void>;
    resolveGroup(groupId: number, instructorId: number): Promise<void>;
}
