import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { NotificationModule } from '../notification/notification.module';
import { ProfileService } from './profile.service';
import { LoginModule } from 'login/login.module';
import { LoginCourseService } from 'login/login-course.service';

@Module({
  imports: [NotificationModule, LoginModule],
  controllers: [ProfileController],
  providers: [ProfileService, LoginCourseService],
})
export class ProfileModule {}
