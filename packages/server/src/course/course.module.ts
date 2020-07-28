import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { QueueModule } from '../queue/queue.module';
import { AdminModule } from 'admin/admin.module';

@Module({
  controllers: [CourseController],
  imports: [QueueModule],
})
export class CourseModule {}
