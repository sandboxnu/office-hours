import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { asyncQuestionController } from './asyncQuestion.controller';
import { asyncQuestionService } from './asyncQuestion.service';

@Module({
  controllers: [asyncQuestionController],
  providers: [asyncQuestionService],
  imports: [NotificationModule],
  exports: [asyncQuestionService],
})
export class asyncQuestionModule {}
