import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { QuestionModule } from './question/question.module';
import { QueueModule } from './queue/queue.module';
import { SeedModule } from './seed/seed.module';
import { AdminModule } from './admin/admin.module';
import { CommandModule } from 'nestjs-command';
import * as typeormConfig from '../ormconfig';
import { AdminCommand } from 'admin/admin.command';
import { ICalCommand } from 'course/ical.command';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    ProfileModule,
    CourseModule,
    QueueModule,
    NotificationModule,
    QuestionModule,
    SeedModule, // Include this condidtionally, based on if the env is set
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        ...(process.env.NODE_ENV !== 'production' ? ['.env.development'] : []),
      ],
      isGlobal: true,
    }),
    AdminModule,
    CommandModule,
  ],
})
export class AppModule {}
