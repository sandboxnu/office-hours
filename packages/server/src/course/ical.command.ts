import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { IcalService } from './ical.service';

@Injectable()
export class ICalCommand {
  constructor(private readonly icalService: IcalService) {}
  @Command({
    command: 'ical:scrape',
    describe: 'scrape ical for a course',
    autoExit: true,
  })
  async create(): Promise<void> {
    await this.icalService.updateAllCourses();
  }
}
