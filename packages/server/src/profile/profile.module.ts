import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { NotificationModule } from '../notification/notification.module';
import { ProfileService } from './profile.service';
import { LoginModule } from 'login/login.module';

@Module({
  imports: [NotificationModule, LoginModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
