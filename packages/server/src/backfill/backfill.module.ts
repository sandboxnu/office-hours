import { Module } from '@nestjs/common';
import { NotificationModule } from 'notification/notification.module';
import { BackfillCourseTimezones } from './backfill-course-timezones';
import { BackfillHuskyEmailsAsNortheastern } from './backfill-husky-emails-to-northeastern';
import { BackfillPhoneNotifs } from './backfill-phone-notifs.command';
import { BackfillMakeEmptyPhotoURLNull } from './make-empty-photourl-null.command';
import { BackfillQuestionFirstHelpedAt } from './question-first-helped-at.command';

@Module({
  imports: [NotificationModule],
  providers: [
    BackfillPhoneNotifs,
    BackfillQuestionFirstHelpedAt,
    BackfillMakeEmptyPhotoURLNull,
    BackfillCourseTimezones,
    BackfillHuskyEmailsAsNortheastern,
  ],
})
export class BackfillModule {}
