import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseController } from './course/course.controller';

@Module({
  imports: [],
  controllers: [AppController, CourseController],
  providers: [AppService],
})
export class AppModule {}
