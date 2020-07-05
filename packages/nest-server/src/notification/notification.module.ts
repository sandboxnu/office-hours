import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DesktopNotifSubscriber } from './desktop-notif-subscriber';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, DesktopNotifSubscriber]
})
export class NotificationModule {}
