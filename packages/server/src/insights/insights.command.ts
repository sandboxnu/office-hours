import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import { Role, allInsights, insightObject } from '@koh/common';
import { QuestionFactory } from '../../test/util/factories';

@Injectable()
export class InsightsCommand {
  constructor(
    private connection: Connection,
    private insightsService: InsightsService,
  ) {}

  // TODO: Convert this to the allInsights type
  allInsights = {
    totalStudents: {
      name: 'Total Students',
      description: 'Gets the total number of students',
      roles: [Role.PROFESSOR],
      component: 'SimpleDisplayComponent',
      output: this.insightsService.getTotalStudents,
    },
    totalQuestionsAsked: {
      name: 'Total Questions Asked',
      output: this.insightsService.getTotalQuestionsAsked,
    },
    totalWaitTime: {
      name: 'Total Wait Time',
      output: this.insightsService.getTotalWaitTime,
    },
    avgWaitTime: {
      name: 'Average Wait Time',
      output: this.insightsService.getAvgWaitTime,
    },
  };

  @Command({
    command: 'semester_insights:generate',
    describe: 'aggregates semesterly analytics for a course',
    autoExit: true,
  })
  private async generateSemesterInsights(): Promise<any> {
    await QuestionFactory.createList(10);
    await this.insightsService.generateInsightsFor({
      insights: [
        this.allInsights.totalStudents,
        this.allInsights.totalQuestionsAsked,
        this.allInsights.totalWaitTime,
        this.allInsights.avgWaitTime,
      ],
      filters: [
        {
          courseId: 5,
        },
        {
          timeFrame: {
            start: new Date(),
            End: new Date(),
          },
        },
      ],
    });

    // const semesterInsights = {
    //   totalStudents: await getTotalStudents(),
    //   totalQuestionsAsked: await DataInsights.getTotalQuestionsAsked(),
    //   totalWaitTime: await DataInsights.getTotalWaitTime(),
    //   avgWaitTime: await DataInsights.getAvgWaitTime(),
    // };
    // console.log(semesterInsights);
  }
}
