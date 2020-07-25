import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  InsertEvent,
} from 'typeorm';
import { DesktopNotifModel } from './desktop-notif.entity';
import { NotificationService } from './notification.service';

@EventSubscriber()
export class DesktopNotifSubscriber
  implements EntitySubscriberInterface<DesktopNotifModel> {
  notifService: NotificationService;
  constructor(connection: Connection, notifService: NotificationService) {
    this.notifService = notifService;
    connection.subscribers.push(this);
  }

  listenTo() {
    return DesktopNotifModel;
  }

  async afterInsert(event: InsertEvent<DesktopNotifModel>) {
    await this.notifService.notifyDesktop(
      event.entity,
      "You've successfully signed up for desktop notifications!",
    );
  }
}
