import { EntitySubscriberInterface, Connection, InsertEvent } from 'typeorm';
import { DesktopNotifModel } from './desktop-notif.entity';
import { NotificationService } from './notification.service';
export declare class DesktopNotifSubscriber implements EntitySubscriberInterface<DesktopNotifModel> {
    notifService: NotificationService;
    constructor(connection: Connection, notifService: NotificationService);
    listenTo(): typeof DesktopNotifModel;
    afterInsert(event: InsertEvent<DesktopNotifModel>): Promise<void>;
}
