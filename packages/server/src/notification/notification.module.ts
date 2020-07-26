import { Module } from '@nestjs/common';
import { DesktopNotifSubscriber } from './desktop-notif-subscriber';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TwilioService } from './twilio/twilio.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, DesktopNotifSubscriber, TwilioService],
  exports: [NotificationService],
})
export class NotificationModule {}
