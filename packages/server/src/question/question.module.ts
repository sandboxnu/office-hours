import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { QuestionController } from './question.controller';
import { QuestionSubscriber } from './question.subscriber';
import { SSEModule } from 'sse/sse.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionSubscriber],
  imports: [NotificationModule, SSEModule],
})
export class QuestionModule {}
