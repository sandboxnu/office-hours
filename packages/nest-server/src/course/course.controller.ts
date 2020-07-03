import { Controller, Get } from '@nestjs/common';
import {Connection} from 'typeorm'
import { Course } from './course.entity';

@Controller('course')
export class CourseController {

  constructor(private connection: Connection){ }

  @Get()
  async testing(): Promise<string> {
    return (await Course.findOne(1)).name
  }
}
