import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsightsModule } from 'insights/insights.module';
import { AlertsModule } from 'alerts/alerts.module';
import { BackfillModule } from 'backfill/backfill.module';
import { CommandModule } from 'nestjs-command';
import { RedisModule } from 'nestjs-redis';
import { ReleaseNotesModule } from 'release-notes/release-notes.module';
import * as typeormConfig from '../ormconfig';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { LoginModule } from './login/login.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { QuestionModule } from './question/question.module';
import { QueueModule } from './queue/queue.module';
import { SeedModule } from './seed/seed.module';
import { SSEModule } from './sse/sse.module';
import { SemesterModule } from 'semester/semester.module';
import { ResourcesModule } from './resources/resources.module';
import { SignupModule } from 'signup/signup.module';
import { asyncQuestionModule } from 'asyncQuestion/asyncQuestion.module';
import { ImageModule } from 'images/image.module';
import { MailModule } from 'mail/mail.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ScheduleModule.forRoot(),
    LoginModule,
    SignupModule,
    ProfileModule,
    CourseModule,
    QueueModule,
    NotificationModule,
    QuestionModule,
    SeedModule,
    MailModule,
    ResourcesModule,
    asyncQuestionModule,
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        ...(process.env.NODE_ENV !== 'production' ? ['.env.development'] : []),
      ],
      isGlobal: true,
    }),
    AdminModule,
    CommandModule,
    SSEModule,
    BackfillModule,
    ReleaseNotesModule,
    InsightsModule,
    ImageModule,
    // Only use 'pub' for publishing events, 'sub' for subscribing, and 'db' for writing to key/value store
    RedisModule.register([{ name: 'pub' }, { name: 'sub' }, { name: 'db' }]),
    HealthcheckModule,
    AlertsModule,
    SemesterModule,
  ],
})
export class AppModule {}
