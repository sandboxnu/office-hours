import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserCourseModel } from 'profile/user-course.entity';
import { QuestionModel } from 'question/question.entity';

@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}
  // Outputs all the data insight output values for a given list of strings
  async generateInsightsFor({ insights, filters }): Promise<any> {
    await Promise.all(
      insights.map(async (insight) => {
        const output = await insight.output();
        console.log(insight.name);
        console.log(output);
        console.log();
        return output;
      }),
    );
  }

  async getTotalStudents(filters = [{}]): Promise<number> {
    return await UserCourseModel.getRepository()
      .createQueryBuilder()
      .where("role = 'student'")
      .getCount();
  }

  async getTotalQuestionsAsked(): Promise<number> {
    return await QuestionModel.getRepository().createQueryBuilder().getCount();
  }

  async getTotalWaitTime(): Promise<number> {
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

  async getAvgWaitTime(): Promise<number> {
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
