import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { QueueModule } from '../queue/queue.module';

@Module({
  controllers: [CourseController],
  imports: [QueueModule],
})
export class CourseModule {}
