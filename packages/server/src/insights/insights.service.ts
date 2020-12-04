import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserCourseModel } from 'profile/user-course.entity';
import { QuestionModel } from 'question/question.entity';
import { QueueModel } from 'queue/queue.entity';

const generateFilterString = (filters): string => {
  return filters.reduce((acc, str) => `${acc} AND ${str}`, '');
};
@Injectable()
export class InsightsService {
  constructor(private connection: Connection) {}
  // Outputs all the data insight output values for a given list of strings
  async generateInsightsFor({ insights, filters }): Promise<any> {
    await Promise.all(
      insights.map(async (insight) => {
        const output = await insight.output(filters);
        console.log('Name: ', insight.name);
        console.log('Output: ', output);
        console.log();
        return output;
      }),
    );
  }

  async getTotalStudents(filters = []): Promise<number> {
    return await UserCourseModel.getRepository()
      .createQueryBuilder()
      .where("role = 'student'" + generateFilterString(filters))
      .getCount();
  }

  async getTotalQuestionsAsked(filters = []): Promise<number> {
    return await QuestionModel.getRepository()
      .createQueryBuilder()
      .where(generateFilterString(filters))
      .getCount();
  }

  async getTotalWaitTime(filters = []): Promise<number> {
    return await QueueModel.getRepository()
      .createQueryBuilder()
      .select(
        'SUM("question_model.helpedAt" - "question_model.createdAt")',
        'totalWaitTime',
      )
      .innerJoin(
        'question_model',
        'question_model',
        '"question_model.queueId" = "QueueModel.id"',
      )
      .where(
        'question_model."helpedAt" IS NOT NULL' + generateFilterString(filters),
      )
      .getRawOne();
    // SELECT SUM(helpedAt - createdAt) FROM questionModel WHERE helpedAt IS NOT NULL;
    /*
    SELECT SUM(QuestionModel.helpedAt - QuestionModel.createdAt) FROM QueueModel INNER JOIN QuestionModel ON 
    QueueModel.id = QuestionModel.queueId WHERE courseId = 5;
     */
  }

  async getAvgWaitTime(filters = []): Promise<number> {
    const waitTimes = await QuestionModel.getRepository()
      .createQueryBuilder()
      .select(
        'AVG("QuestionModel.helpedAt" - "QuestionModel.createdAt")',
        'totalWaitTime',
      )
      .where(
        '"QuestionModel.helpedAt" IS NOT NULL' + generateFilterString(filters),
      )
      .getRawOne();
    // SELECT AVG(helpedAt - createdAt) FROM questionModel WHERE helpedAt IS NOT NULL;
    return waitTimes;
  }
}
