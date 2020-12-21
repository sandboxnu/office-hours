import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { QuestionController } from './question.controller';
import { QuestionSubscriber } from './question.subscriber';
import { QueueModule } from '../queue/queue.module';

@Module({
  controllers: [QuestionController],
  providers: [QuestionSubscriber],
  imports: [NotificationModule, QueueModule],
})
export class QuestionModule {}
