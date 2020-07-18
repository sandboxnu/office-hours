import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'dev',
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
      logging: process.env.NODE_ENV !== 'production',
    }),
    ProfileModule,
    CourseModule,
    QueueModule,
    NotificationModule,
    QuestionModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
