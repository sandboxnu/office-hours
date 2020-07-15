import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';

@Module({
  controllers: [QueueController],
})
export class QueueModule {}
