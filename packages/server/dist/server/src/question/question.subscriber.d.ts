import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { QueueSSEService } from '../queue/queue-sse.service';
import { QuestionModel } from './question.entity';
export declare class QuestionSubscriber implements EntitySubscriberInterface<QuestionModel> {
    private notifService;
    private queueSSEService;
    constructor(connection: Connection, notifService: NotificationService, queueSSEService: QueueSSEService);
    listenTo(): typeof QuestionModel;
    afterUpdate(event: UpdateEvent<QuestionModel>): Promise<void>;
    afterInsert(event: InsertEvent<QuestionModel>): Promise<void>;
    beforeRemove(event: RemoveEvent<QuestionModel>): Promise<void>;
}
