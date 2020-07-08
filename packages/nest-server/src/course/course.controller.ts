import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { Course } from './course.entity';
import { GetCourseResponse } from '@template/common';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';

@Controller('courses')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class CourseController {
  constructor(private connection: Connection) {}

  @Get(':id')
  async get(@Param('id') id: number): Promise<GetCourseResponse> {
    return await Course.findOne(id, {
      relations: ['officeHours', 'queues'],
    });
  }
}
