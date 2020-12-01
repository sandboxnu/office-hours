import { Module } from '@nestjs/common';
import { InsightsCommand } from './insights.command';
import { InsightsService } from './insights.service';

@Module({
  providers: [InsightsCommand, InsightsService],
})
export class InsightsModule {}
