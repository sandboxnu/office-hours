import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueCleanService } from './queue-clean/queue-clean.service';
import { SSEModule } from 'sse/sse.module';
import { QueueService } from './queue.service';
import { QueueSSEService } from './queue-sse.service';

@Module({
  controllers: [QueueController],
  providers: [QueueCleanService, QueueService, QueueSSEService],
  exports: [QueueCleanService, QueueSSEService],
  imports: [SSEModule],
})
export class QueueModule {}
