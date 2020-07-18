import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './profile/profile.module';
import { CourseModule } from './course/course.module';
import { CourseModel } from './course/course.entity';
import { QueueModule } from './queue/queue.module';
import { NotificationModule } from './notification/notification.module';
import { OfficeHourModel } from './course/office-hour.entity';
import { SemesterModel } from './course/semester.entity';
import { UserModel } from './profile/user.entity';
import { UserCourseModel } from './profile/user-course.entity';
import { QuestionModel } from './question/question.entity';
import { QueueModel } from './queue/queue.entity';
import { QuestionModule } from './question/question.module';
import { DesktopNotifModel } from './notification/desktop-notif.entity';
import { PhoneNotifModel } from './notification/phone-notif.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        entities: [
          CourseModel,
          OfficeHourModel,
          SemesterModel,
          UserModel,
          UserCourseModel,
          QuestionModel,
          QueueModel,
          DesktopNotifModel,
          PhoneNotifModel,
        ],
        synchronize: true,
        keepConnectionAlive: true,
      }),
    }),
    ProfileModule,
    CourseModule,
    QueueModule,
    NotificationModule,
    QuestionModule,
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        ...(process.env.NODE_ENV !== 'production' ? ['.env.development'] : []),
      ],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
