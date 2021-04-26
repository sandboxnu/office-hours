import { Module } from '@nestjs/common';
import { NotificationModule } from 'notification/notification.module';
import { BackfillCourseTimezones } from './backfill-course-timezones';
import { BackfillHuskyEmailsAsNortheastern } from './backfill-husky-emails-to-northeastern';
import { BackfillPhoneNotifs } from './backfill-phone-notifs.command';
import { BackfillUserInsights } from './backfill-user-insights.command';
import { BackfillMakeEmptyPhotoURLNull } from './make-empty-photourl-null.command';

@Module({
  imports: [NotificationModule],
  providers: [
    BackfillPhoneNotifs,
    BackfillMakeEmptyPhotoURLNull,
    BackfillCourseTimezones,
    BackfillHuskyEmailsAsNortheastern,
    BackfillUserInsights,
  ],
})
export class BackfillModule {}
