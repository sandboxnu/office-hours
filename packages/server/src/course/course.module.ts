import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { CourseController } from './course.controller';

@Module({
  controllers: [CourseController],
})
export class CourseModule {}
