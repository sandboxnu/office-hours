import { Injectable } from '@nestjs/common';
import { CourseModel } from 'course/course.entity';
import { Command } from 'nestjs-command';

@Injectable()
export class BackfillSectionGroupName {
  @Command({
    command: 'backfill:section-group-name',
    describe:
      'set the sectionGroupName of older courses as the same as the course name',
    autoExit: true,
  })
  async fix(): Promise<void> {
    await CourseModel.createQueryBuilder()
      .update()
      .set({ sectionGroupName: () => 'name' })
      .where('sectionGroupName IS NULL')
      .execute();
  }
}
