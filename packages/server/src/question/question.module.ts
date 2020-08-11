import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { QuestionController } from './question.controller';
import { QuestionSubscriber } from './question.subscriber';

@Module({
  controllers: [QuestionController],
  providers: [QuestionSubscriber],
  imports: [NotificationModule],
})
export class QuestionModule {}
