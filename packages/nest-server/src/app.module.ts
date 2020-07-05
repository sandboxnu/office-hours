import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { CourseModule } from './course/course.module';
import { Course } from './course/course.entity';
import { QueueModule } from './queue/queue.module';
import { NotificationModule } from './notification/notification.module';
import { OfficeHour } from './course/office-hour.entity';
import { Semester } from './course/semester.entity';
import { User } from './profile/user.entity';
import { UserCourse } from './profile/user-course.entity';
import { Question } from './question/question.entity';
import { Queue } from './queue/queue.entity';
import { QuestionModule } from './question/question.module';
import { DesktopNotif } from './notification/desktop-notif.entity';
import { PhoneNotif } from './notification/phone-notif.entity';

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
        Course,
        OfficeHour,
        Semester,
        User,
        UserCourse,
        Question,
        Queue,
        DesktopNotif,
        PhoneNotif,
      ],
      synchronize: true,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
