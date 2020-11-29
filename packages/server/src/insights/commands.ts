import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserCourseModel } from 'profile/user-course.entity';
import { QuestionModel } from 'question/question.entity';

@Injectable()
export class DataInsights {
  constructor(private connection: Connection) {}

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
    const semesterInsights = {
      totalStudents: await DataInsights.getTotalStudents(),
      totalQuestionsAsked: await DataInsights.getTotalQuestionsAsked(),
      totalWaitTime: await DataInsights.getTotalWaitTime(),
      avgWaitTime: await DataInsights.getAvgWaitTime(),
    };
    console.log(semesterInsights);
  }

  private static async getTotalStudents(): Promise<number> {
    return await UserCourseModel.getRepository()
      .createQueryBuilder()
      .where("role = 'student'")
      .getCount();
  }

  private static async getTotalQuestionsAsked(): Promise<number> {
    return await QuestionModel.getRepository().createQueryBuilder().getCount();
  }

  private static async getTotalWaitTime(): Promise<number> {
    const waitTimes = await QuestionModel.getRepository()
      .createQueryBuilder()
      .select(
        'SUM(QuestionModel.helpedAt - QuestionModel.createdAt)',
        'totalWaitTime',
      )
      .where('QuestionModel.helpedAt IS NOT NULL')
      .getRawOne();
    // SELECT SUM(helpedAt - createdAt) FROM questionModel WHERE helpedAt IS NOT NULL;
    return waitTimes;
  }

  private static async getAvgWaitTime(): Promise<number> {
    const waitTimes = await QuestionModel.getRepository()
      .createQueryBuilder()
      .select(
        'AVG(QuestionModel.helpedAt - QuestionModel.createdAt)',
        'totalWaitTime',
      )
      .where('QuestionModel.helpedAt IS NOT NULL')
      .getRawOne();
    // SELECT AVG(helpedAt - createdAt) FROM questionModel WHERE helpedAt IS NOT NULL;
    return waitTimes;
  }
}
