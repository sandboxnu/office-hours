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
    const result = await CourseModel.createQueryBuilder()
      .update()
      .set({ sectionGroupName: () => 'name' })
      .where('sectionGroupName IS NULL')
      .execute();
    console.log(`Set sectionGroupName for ${result.affected} courses`);
  }
}
