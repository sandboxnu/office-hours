import { Module } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';

@Module({
  controllers: [InsightsController],
  providers: [InsightsService],
})
export class InsightsModule {}
