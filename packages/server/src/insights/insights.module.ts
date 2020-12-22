import { Module } from '@nestjs/common';
import { InsightsCommand } from './insights.command';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';

@Module({
  controllers: [InsightsController],
  providers: [InsightsCommand, InsightsService],
})
export class InsightsModule {}
