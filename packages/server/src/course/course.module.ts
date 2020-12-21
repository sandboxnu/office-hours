import { CacheModule, Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { QueueModule } from '../queue/queue.module';
import { ICalCommand } from './ical.command';
import { IcalService } from './ical.service';
import { HeatmapService } from './heatmap.service';

@Module({
  controllers: [CourseController],
  imports: [QueueModule, CacheModule.register()],
  providers: [ICalCommand, IcalService, HeatmapService],
})
export class CourseModule {}
