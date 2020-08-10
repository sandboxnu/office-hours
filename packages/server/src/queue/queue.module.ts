import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueCleanService } from './queue-clean/queue-clean.service';
import { SSEModule } from 'sse/sse.module';

@Module({
  controllers: [QueueController],
  providers: [QueueCleanService],
  exports: [QueueCleanService],
  imports: [SSEModule],
})
export class QueueModule {}
