import { Connection } from 'typeorm';
import { QueueModel } from '../queue.entity';
export declare class QueueCleanService {
    private connection;
    constructor(connection: Connection);
    private cleanAllQueues;
    checkoutAllStaff(): Promise<void>;
    cleanQueue(queueId: number, force?: boolean): Promise<void>;
    shouldCleanQueue(queue: QueueModel): Promise<boolean>;
    private unsafeClean;
}
