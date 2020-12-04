import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import { Role, allInsights, insightObject } from '@koh/common';
import { QuestionFactory } from '../../test/util/factories';
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

  // TODO: Convert this to the allInsights type
  allInsights = {
    // totalStudents: {
    //   name: 'Total Students',
    //   description: 'Gets the total number of students',
    //   roles: [Role.PROFESSOR],
    //   component: 'SimpleDisplayComponent',
    //   output: this.insightsService.getTotalStudents,
    // },
    // totalQuestionsAsked: {
    //   name: 'Total Questions Asked',
    //   output: this.insightsService.getTotalQuestionsAsked,
    // },
    totalWaitTime: {
      name: 'Total Wait Time',
      output: this.insightsService.getTotalWaitTime,
    },
    // avgWaitTime: {
    //   name: 'Average Wait Time',
    //   output: this.insightsService.getAvgWaitTime,
    // },
  };

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
    await this.insightsService.generateInsightsFor({
      insights: [
        //this.allInsights.totalStudents,
        //this.allInsights.totalQuestionsAsked,
        this.allInsights.totalWaitTime,
        //this.allInsights.avgWaitTime,
      ],
      filters: [`"courseId" = ${courseId}`],
    });
  }
}
