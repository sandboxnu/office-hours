import { BaseEntity } from 'typeorm';
import { UserCourseModel } from '../profile/user-course.entity';
import { QueueModel } from '../queue/queue.entity';
import { QuestionModel } from './question.entity';
export declare class QuestionGroupModel extends BaseEntity {
    id: number;
    questions: QuestionModel[];
    creator: UserCourseModel;
    creatorId: number;
    queue: QueueModel;
    queueId: number;
}
