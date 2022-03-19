import { Controller, Get, HttpService, Param } from '@nestjs/common';
import { CourseModel } from '../course/course.entity';
import { Connection } from 'typeorm';

/**
 * Controller for any public resources on the app. Anything accessed through this controller does
 * not need any JWT or role guards.
 */
@Controller('resources')
export class ResourcesController {
  constructor(
    private connection: Connection,
    private httpService: HttpService,
  ) {}

  @Get('/calendar/:course')
  async getCourseCalendar(@Param('course') courseId: number): Promise<string> {
    const course = await CourseModel.findOne(courseId);
    const request = await this.httpService.get(course.icalURL).toPromise();
    return request.data;
  }
}
