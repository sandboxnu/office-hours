import { Module } from '@nestjs/common';
import { SSEService } from './sse.service';

@Module({ providers: [SSEService], exports: [SSEService] })
export class SSEModule {}
