import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import { Role, allInsights, insightObject } from '@koh/common';

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
      output: this.insightsService.getTotalQuestionsAsked,
    },
    totalWaitTime: {
      output: this.insightsService.getTotalWaitTime,
    },
    avgWaitTime: {
      output: this.insightsService.getAvgWaitTime,
    },
  };

  @Command({
    command: 'semester_insights:generate',
    describe: 'aggregates semesterly analytics for a course',
    autoExit: true,
  })

  // Returns an object with a mapping of specific questions and answers related to data insights.
  // "what was the total number of students who used the app? -> totalStudents
  // "How many questions were asked over the entire semester?" -> totalQuestionsAsked
  // "What was the total amount of time spent waiting in minutes?" -> totalWaitTime
  private async generateSemesterInsights(): Promise<any> {
    this.insightsService.generateInsightsFor({
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
