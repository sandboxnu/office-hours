import { GetCourseResponse, QueuePartial } from '@koh/common';
import { Connection } from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueSSEService } from '../queue/queue-sse.service';
export declare class CourseController {
    private connection;
    private queueCleanService;
    private queueSSEService;
    constructor(connection: Connection, queueCleanService: QueueCleanService, queueSSEService: QueueSSEService);
    get(id: number): Promise<GetCourseResponse>;
    checkIn(courseId: number, room: string, user: UserModel): Promise<QueuePartial>;
    checkOut(courseId: number, room: string, user: UserModel): Promise<void>;
}
