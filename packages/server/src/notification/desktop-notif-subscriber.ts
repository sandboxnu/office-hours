import {
  EventSubscriber,
  EntitySubscriberInterface,
  Connection,
  InsertEvent,
} from 'typeorm';
import { DesktopNotif } from './desktop-notif.entity';
import { NotificationService } from './notification.service';

@EventSubscriber()
export class DesktopNotifSubscriber
  implements EntitySubscriberInterface<DesktopNotif> {
  notifService: NotificationService;
  constructor(connection: Connection, notifService: NotificationService) {
    this.notifService = notifService;
    connection.subscribers.push(this);
  }

  listenTo() {
    return DesktopNotif;
  }

  async afterInsert(event: InsertEvent<DesktopNotif>) {
    console.log(`BEFORE DESKTOPNOTIF INSERTED: `, event.entity);
    await this.notifService.notifyDesktop(
      event.entity,
      "You've successfully signed up for desktop notifications!",
    );
  }
}
