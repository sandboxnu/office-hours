import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModel } from './course/course.entity';
import { CourseModule } from './course/course.module';
import { OfficeHourModel } from './course/office-hour.entity';
import { SemesterModel } from './course/semester.entity';
import { DesktopNotifModel } from './notification/desktop-notif.entity';
import { NotificationModule } from './notification/notification.module';
import { PhoneNotifModel } from './notification/phone-notif.entity';
import { ProfileModule } from './profile/profile.module';
import { UserCourseModel } from './profile/user-course.entity';
import { UserModel } from './profile/user.entity';
import { QuestionModel } from './question/question.entity';
import { QuestionModule } from './question/question.module';
import { QueueModel } from './queue/queue.entity';
import { QueueModule } from './queue/queue.module';
import { SeedModule } from './seed/seed.module';

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
    SeedModule, // Include this condidtionally, based on if the env is set
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
