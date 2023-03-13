import { Module } from '@nestjs/common';
import { asyncQuestionController } from './asyncQuestion.controller';
import { AsyncQuestionService } from './asyncQuestion.service';
@Module({
  controllers: [asyncQuestionController],
  providers: [AsyncQuestionService],
})
export class asyncQuestionModule {}
