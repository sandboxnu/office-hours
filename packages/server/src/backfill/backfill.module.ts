import { Module } from '@nestjs/common';
import { NotificationModule } from 'notification/notification.module';
import { BackfillCourseTimezones } from './backfill-course-timezones';
import { BackfillPhoneNotifs } from './backfill-phone-notifs.command';
import { BackfillMakeEmptyPhotoURLNull } from './make-empty-photourl-null.command';
import { BackfillQuestionFirstHelpedAt } from './question-first-helped-at.command';
import { BackfillSeparateFirstLastNames } from './separate-first-last-names.command';

@Module({
  imports: [NotificationModule],
  providers: [
    BackfillPhoneNotifs,
    BackfillQuestionFirstHelpedAt,
    BackfillSeparateFirstLastNames,
    BackfillMakeEmptyPhotoURLNull,
    BackfillCourseTimezones,
  ],
})
export class BackfillModule {}
