import { BaseEntity } from 'typeorm';
import { QueueModel } from '../queue/queue.entity';
import { CourseModel } from './course.entity';
export declare class OfficeHourModel extends BaseEntity {
    id: number;
    course: CourseModel;
    courseId: number;
    queue: QueueModel;
    queueId: number;
    title: string;
    startTime: Date;
    endTime: Date;
    get room(): string;
}
