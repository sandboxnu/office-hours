import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { CourseModel } from 'course/course.entity';

@Injectable()
export class BackfillCourseTimezones {
  @Command({
    command: 'backfill:course-timezones',
    describe: 'set all course timezones from null to "America/New_York"',
    autoExit: true,
  })
  async copy(): Promise<void> {
    await CourseModel.createQueryBuilder()
      .update()
      .set({ timezone: () => `'America/New_York'` })
      .callListeners(false)
      .execute();
    console.log(`Updated ${await CourseModel.count()} courses`);
  }
}
