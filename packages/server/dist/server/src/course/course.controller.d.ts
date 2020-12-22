import { GetCourseResponse, QueuePartial, TACheckoutResponse } from '@koh/common';
import { Connection } from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { QueueCleanService } from '../queue/queue-clean/queue-clean.service';
import { QueueSSEService } from '../queue/queue-sse.service';
import { HeatmapService } from './heatmap.service';
import { IcalService } from './ical.service';
export declare class CourseController {
    private connection;
    private queueCleanService;
    private queueSSEService;
    private heatmapService;
    private icalService;
    constructor(connection: Connection, queueCleanService: QueueCleanService, queueSSEService: QueueSSEService, heatmapService: HeatmapService, icalService: IcalService);
    get(id: number): Promise<GetCourseResponse>;
    checkIn(courseId: number, room: string, user: UserModel): Promise<QueuePartial>;
    checkOut(courseId: number, room: string, user: UserModel): Promise<TACheckoutResponse>;
    updateCalendar(courseId: number): Promise<void>;
}
