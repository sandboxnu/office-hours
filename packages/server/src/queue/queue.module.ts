import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { SSEModule } from 'sse/sse.module';

@Module({
  controllers: [QueueController],
  providers: [QueueService],
  exports: [QueueService],
  imports: [SSEModule],
})
export class QueueModule {}
