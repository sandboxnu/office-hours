import { Controller, Get, HttpService } from '@nestjs/common';
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

  @Get('/calendar')
  async calendar(): Promise<string> {
    const request = await this.httpService
      .get(
        'https://calendar.google.com/calendar/ical/iris.lamb2%40gmail.com/public/basic.ics',
      )
      .toPromise();
    return request.data;
  }
}
