import { Module } from '@nestjs/common';
import { NotificationModule } from 'notification/notification.module';
import { BackfillCourseTimezones } from './backfill-course-timezones';
import { BackfillDefaultUserTeamsMessages } from './backfill-default-user-teams-messages';
import { BackfillHuskyEmailsAsNortheastern } from './backfill-husky-emails-to-northeastern';
import { BackfillQuestionGroupable } from './backfill-question-groupable';
import { BackfillSectionGroupName } from './backfill-section-group-name';
import { BackfillUserInsights } from './backfill-user-insights.command';
import { BackfillMakeEmptyPhotoURLNull } from './make-empty-photourl-null.command';

@Module({
  imports: [NotificationModule],
  providers: [
    BackfillMakeEmptyPhotoURLNull,
    BackfillCourseTimezones,
    BackfillDefaultUserTeamsMessages,
    BackfillHuskyEmailsAsNortheastern,
    BackfillQuestionGroupable,
    BackfillUserInsights,
    BackfillSectionGroupName,
  ],
})
export class BackfillModule {}
