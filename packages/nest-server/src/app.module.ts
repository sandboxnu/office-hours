import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseController } from './course/course.controller';
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
import { Notif } from './notification/notif.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'dev',
      entities: [Course, OfficeHour, Semester, Notif, User, UserCourse, Question, Queue],
      synchronize: true,
    }),
    ProfileModule,
    CourseModule,
    QueueModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
