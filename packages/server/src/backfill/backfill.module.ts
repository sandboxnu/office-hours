import { Module } from '@nestjs/common';
import { NotificationModule } from 'notification/notification.module';
import { BackfillPhoneNotifs } from './backfill-phone-notifs.command';

@Module({
  imports: [NotificationModule],
  providers: [BackfillPhoneNotifs],
})
export class BackfillModule {}
