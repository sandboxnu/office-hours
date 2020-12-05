import { GetCourseResponse, QueuePartial, TACheckoutResponse } from '@koh/common';
import { Connection } from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { HeatmapService } from './heatmap.service';
import { QueueSSEService } from '../queue/queue-sse.service';
export declare class CourseController {
    private connection;
    private queueCleanService;
    private queueSSEService;
    private heatmapService;
    constructor(connection: Connection, queueCleanService: QueueCleanService, queueSSEService: QueueSSEService, heatmapService: HeatmapService);
    get(id: number): Promise<GetCourseResponse>;
    checkIn(courseId: number, room: string, user: UserModel): Promise<QueuePartial>;
    checkOut(courseId: number, room: string, user: UserModel): Promise<TACheckoutResponse>;
}
