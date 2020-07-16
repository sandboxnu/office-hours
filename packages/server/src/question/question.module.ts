import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { QuestionController } from './question.controller';

@Module({
  controllers: [QuestionController],
  imports: [NotificationModule],
})
export class QuestionModule {}
