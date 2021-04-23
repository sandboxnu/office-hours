import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { QueueModule } from '../queue/queue.module';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { QuestionSubscriber } from './question.subscriber';

@Module({
  controllers: [QuestionController],
  providers: [QuestionSubscriber, QuestionService],
  imports: [NotificationModule, QueueModule],
  exports: [QuestionService],
})
export class QuestionModule {}
