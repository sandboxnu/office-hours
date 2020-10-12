import { Connection } from 'typeorm';
export declare class QueueCleanService {
    private connection;
    constructor(connection: Connection);
    private cleanAllQueues;
    cleanQueue(queueId: number): Promise<void>;
    private unsafeClean;
}
