import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { IcalService } from './ical.service';
import { CourseModel } from './course.entity';

@Injectable()
export class ICalCommand {
  constructor(private readonly icalService: IcalService) {}
  @Command({
    command: 'ical:scrape <courseId>',
    describe: 'scrape ical for a course',
    autoExit: true,
  })
  async create(
    @Positional({
      name: 'courseId',
      describe:
        'the database id of the course. Check admin panel to find ids easily.',
      type: 'number',
    })
    courseId: number,
  ): Promise<void> {
    const c = await CourseModel.findOne(courseId);
    if (c) {
      console.log(
        `scraping ical for course "${c.name}" at url: ${c.icalURL}...`,
      );
      console.time('scrape');
      await this.icalService.updateCalendarForCourse(c);
      console.timeEnd('scrape');
      console.log('done scraping!');
    } else {
      console.log(`course id ${courseId} does not exist`);
    }
  }
}
