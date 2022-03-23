import {
  CACHE_MANAGER,
  Controller,
  Get,
  HttpService,
  Inject,
  Param,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/calendar/:course/refresh=:refresh')
  async getCourseCalendar(
    @Param('course') courseId: number,
    @Param('refresh') refresh: boolean,
  ): Promise<string> {
    const cacheKey = `/calendar/${courseId}`;
    const cal = await this.cacheManager.get(cacheKey);
    if (!cal || refresh) {
      const course = await CourseModel.findOne(courseId);
      const request = await this.httpService.get(course.icalURL).toPromise();
      await this.cacheManager.set(cacheKey, request.data, { ttl: 86400 }); // cache results for 24 hrs
      return request.data;
    } else {
      return cal;
    }
  }
}
