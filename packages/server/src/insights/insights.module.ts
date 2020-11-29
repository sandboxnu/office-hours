import { Module } from '@nestjs/common';
import { DataInsights } from './commands';

@Module({
  providers: [DataInsights],
})
export class InsightsModule {}
