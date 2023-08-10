import { Module } from '@nestjs/common';
import { DesktopNotifSubscriber } from './desktop-notif-subscriber';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, DesktopNotifSubscriber],
  exports: [NotificationService],
})
export class NotificationModule {}
