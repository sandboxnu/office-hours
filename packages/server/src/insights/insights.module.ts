import { Module, CacheModule } from '@nestjs/common';
import { InsightsCommand } from './insights.command';
import { InsightsService } from './insights.service';
import { InsightsController } from './insights.controller';

@Module({
  controllers: [InsightsController],
  imports: [CacheModule.register()],
  providers: [InsightsCommand, InsightsService],
})
export class InsightsModule {}
