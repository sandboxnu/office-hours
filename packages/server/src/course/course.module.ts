import { CacheModule, Module } from '@nestjs/common';
import { QueueModule } from '../queue/queue.module';
import { LoginModule } from '../login/login.module';
import { LoginCourseService } from '../login/login-course.service';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { HeatmapService } from './heatmap.service';

@Module({
  controllers: [CourseController],
  imports: [QueueModule, LoginModule, CacheModule.register()],
  providers: [LoginCourseService, HeatmapService, CourseService],
})
export class CourseModule {}
