import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { DesktopNotifModel } from './desktop-notif.entity';
import { NotificationService } from './notification.service';

@EventSubscriber()
export class DesktopNotifSubscriber
  implements EntitySubscriberInterface<DesktopNotifModel>
{
  notifService: NotificationService;
  constructor(connection: Connection, notifService: NotificationService) {
    this.notifService = notifService;
    connection.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listenTo() {
    return DesktopNotifModel;
  }

  async afterInsert(event: InsertEvent<DesktopNotifModel>): Promise<void> {
    await this.notifService.notifyDesktop(
      event.entity,
      "You've successfully signed up for desktop notifications!",
    );
  }
}
