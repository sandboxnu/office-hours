import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';

@Module({
  controllers: [NotificationController]
})
export class NotificationModule {}
