import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import { QuestionFactory } from '../../test/util/factories';
import { totalUsers } from './insights';

/**
 * Initial Product: Create a system to aggregate certain data within a certain time period for one course
 * or accross all courses
 *
 * Support courseIds and time intervals (no longer than a semester)
 */
@Injectable()
export class InsightsCommand {
  constructor(
    private connection: Connection,
    private insightsService: InsightsService,
  ) {}

  @Command({
    command: 'semester_insights:generate <courseId>',
    describe: 'aggregates semesterly analytics for a course',
    autoExit: true,
  })
  private async generateSemesterInsights(
    @Positional({
      name: 'courseId',
      describe: 'the id of the coure to aggregate data for',
      type: 'number',
    })
    courseId: number,
  ): Promise<any> {
    await QuestionFactory.createList(10);
    const insights = await this.insightsService.generateInsightsFor({
      insights: [totalUsers],
      filters: [
        {
          type: 'courseId',
          conditional: `"courseId" = ${courseId}`,
        },
      ],
    });
    for (const insight of Object.values(insights)) {
      console.log('Name:   ', insight['displayName']);
      console.log('Output: ', insight['output']);
      console.log('-');
    }
  }
}
