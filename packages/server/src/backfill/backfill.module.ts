import { Module } from '@nestjs/common';
import { NotificationModule } from 'notification/notification.module';
import { BackfillPhoneNotifs } from './backfill-phone-notifs.command';
import { BackfillQuestionFirstHelpedAt } from './question-first-helped-at.command';
import { BackfillSeparateFirstLastNames } from './separate-first-last-names.command';

@Module({
  imports: [NotificationModule],
  providers: [
    BackfillPhoneNotifs,
    BackfillQuestionFirstHelpedAt,
    BackfillSeparateFirstLastNames,
  ],
})
export class BackfillModule {}
