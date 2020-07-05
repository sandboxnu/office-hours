import { Controller, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Course } from './course.entity';
import { GetCourseResponse } from '@template/common';

@Controller('courses')
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(private connection: Connection) {}

  @Get(':id')
  async get(@Param() params): Promise<GetCourseResponse> {
    return await Course.findOne(params.id, {
      relations: ['officeHours', 'queues'],
    });
  }
}
