import { Module } from '@nestjs/common';
import { SSEService } from './sse.service';

@Module({ providers: [SSEService] })
export class SSEModule {}
