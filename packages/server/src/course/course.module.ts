import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { QueueModule } from '../queue/queue.module';
import { ICalCommand } from './ical.command';
import { IcalService } from './ical.service';

@Module({
  controllers: [CourseController],
  imports: [QueueModule],
  providers: [ICalCommand, IcalService],
})
export class CourseModule {}
