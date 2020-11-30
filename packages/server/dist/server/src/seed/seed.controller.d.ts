import { CreateQuestionParams, Role } from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { Connection } from 'typeorm';
import { QuestionModel } from '../question/question.entity';
import { QueueModel } from '../queue/queue.entity';
import { SeedService } from './seed.service';
export declare class SeedController {
    private connection;
    private seedService;
    constructor(connection: Connection, seedService: SeedService);
    deleteAll(): Promise<string>;
    createSeeds(): Promise<string>;
    fillQueue(): Promise<string>;
    createUser(body: {
        role: Role;
        courseId: number;
    }): Promise<UserCourseModel>;
    createQueue(body: {
        courseId: number;
        allowQuestions: boolean;
        closesIn?: number;
    }): Promise<QueueModel>;
    createQuestion(body: {
        queueId: number;
        studentId: number;
        data: CreateQuestionParams;
    }): Promise<QuestionModel>;
}
