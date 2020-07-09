import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';

@Module({
  controllers: [QuestionController],
})
export class QuestionModule {}
