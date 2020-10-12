import { QueueSSEService } from 'queue/queue-sse.service';
import { Connection, EntitySubscriberInterface, UpdateEvent } from 'typeorm';
import { QueueModel } from './queue.entity';
export declare class QueueSubscriber implements EntitySubscriberInterface<QueueModel> {
    private queueSSEService;
    constructor(connection: Connection, queueSSEService: QueueSSEService);
    listenTo(): typeof QueueModel;
    afterUpdate(event: UpdateEvent<QueueModel>): Promise<void>;
}
