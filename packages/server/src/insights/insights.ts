import {
  QuestionType,
  Role,
  PossibleOutputTypes,
  SimpleDisplayOutputType,
} from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { SelectQueryBuilder } from 'typeorm';
import { QuestionModel } from 'question/question.entity';

export interface InsightInterface<Model> {
  name: string;
  displayName: string;
  description: string;
  roles: Role[];
  component: string; // In the future we can make this an enum
  model: new () => Model; // One of the modals have
  possibleFilters: string[];
  addFilters: (
    queryBuilder: SelectQueryBuilder<Model>,
    filters: any,
  ) => SelectQueryBuilder<Model>;
  compute: (
    queryBuilder: SelectQueryBuilder<Model>,
    insightFilters: any,
  ) => Promise<PossibleOutputTypes>;
  output?: Promise<PossibleOutputTypes>;
}

class TotalUsers implements InsightInterface<UserCourseModel> {
  name = 'totalStudents';
  displayName = 'Total Students';
  description = 'Gets the total number of students';
  roles = [Role.PROFESSOR];
  component = 'SimpleDisplay';
  model = UserCourseModel;
  possibleFilters = ['courseId', 'role'];

  async compute(
    queryBuilder: SelectQueryBuilder<UserCourseModel>,
    filters,
  ): Promise<SimpleDisplayOutputType> {
    return await this.addFilters(
      queryBuilder.where("role = 'student'"),
      filters,
    ).getCount();
  }

  addFilters(queryBuilder, filters): SelectQueryBuilder<UserCourseModel> {
    filters.forEach((filter) => {
      if (!this.possibleFilters.includes(filter.type)) {
        throw new Error(
          `${filter} is not a possbile filter for "${this.name}"`,
        );
      }
      switch (filter.type) {
        case 'courseId':
          queryBuilder.andWhere(filter.conditional);
      }
    });
    return queryBuilder;
  }
}

class TotalQuestionsAsked implements InsightInterface<QuestionModel> {
  name = 'totalQuestionsAsked';
  displayName = 'Total Questions Asked';
  description = 'Gets the total number questions asked';
  roles = [Role.PROFESSOR];
  component = 'SimpleDisplay';
  model = QuestionModel;
  possibleFilters = ['courseId', 'timeframe'];

  async compute(
    queryBuilder: SelectQueryBuilder<QuestionModel>,
    filters,
  ): Promise<SimpleDisplayOutputType> {
    return await this.addFilters(
      queryBuilder.where('TRUE'),
      filters,
    ).getCount();
  }

  addFilters(queryBuilder, filters): SelectQueryBuilder<QuestionModel> {
    filters.forEach((filter) => {
      if (!this.possibleFilters.includes(filter.type)) {
        throw new Error(
          `${filter} is not a possbile filter for "${this.name}"`,
        );
      }
      switch (filter.type) {
        case 'courseId':
          queryBuilder
            .innerJoinAndSelect('QuestionModel.queue', 'queue')
            .andWhere(`queue.${filter.conditional}`);
          break;
        case 'timeframe':
          queryBuilder.andWhere(
            'QuestionModel.createdAt BETWEEN :start AND :end',
            { start: filter.start, end: filter.end },
          );
          break;
      }
    });
    return queryBuilder;
  }
}

// WIP
class QuestionTypeBreakdown implements InsightInterface<QuestionModel> {
  name = 'questionTypeBreakdown';
  displayName = 'Question Type Breakdown';
  description =
    'Returns a table of each question type and how many questions of that type were asked';
  roles = [Role.PROFESSOR];
  component = 'SimpleChart';
  model = QuestionModel;
  possibleFilters = ['courseId', 'timeframe'];

  async compute(queryBuilder: SelectQueryBuilder<QuestionModel>, filters): any {
    const info = await this.addFilters(
      queryBuilder
        .select('"QuestionModel"."questionType"', 'questionType')
        .addSelect('COUNT(*)', 'totalQuestions'),
      filters,
    )
      .groupBy('"QuestionModel"."questionType"')
      .having('"QuestionModel"."questionType" IS NOT NULL')
      .getRawMany();

    const typesFromInfo = info.map((obj) => obj['questionType']);

    Object.values(QuestionType).forEach((v) => {
      if (!typesFromInfo.includes(v)) {
        info.push({ questionType: v, totalQuestions: '0' });
      }
    });
    const insightObj = {
      data: info.sort((a, b) =>
        a.questionType === b.questionType
          ? 0
          : a.questionType > b.questionType
          ? 1
          : -1,
      ),
      xAxisName: 'questionType',
      yAxisName: 'totalQuestions',
    };
    return insightObj;
  }

  addFilters(queryBuilder, filters): SelectQueryBuilder<QuestionModel> {
    filters.forEach((filter) => {
      if (!this.possibleFilters.includes(filter.type)) {
        throw new Error(
          `${filter} is not a possbile filter for "${this.name}"`,
        );
      }
      switch (filter.type) {
        case 'courseId':
          queryBuilder
            .innerJoin('QuestionModel.queue', 'queue')
            .andWhere('"QuestionModel"."questionType" IS NOT NULL')
            .andWhere(`queue.${filter.conditional}`);
          break;
      }
    });

    return queryBuilder;
  }
}

class AverageWaitTime implements InsightInterface<QuestionModel> {
  name = 'averageWaitTime';
  displayName = 'Average Wait Time';
  description = 'Gets the average wait time';
  roles = [Role.PROFESSOR];
  component = 'SimpleDisplay';
  model = QuestionModel;
  possibleFilters = ['courseId', 'timeframe'];

  async compute(
    queryBuilder: SelectQueryBuilder<QuestionModel>,
    filters,
  ): Promise<SimpleDisplayOutputType> {
    return await this.addFilters(
      queryBuilder
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.helpedAt - QuestionModel.createdAt)::INTERVAL)/60',
          'avgWaitTimeInMinutes',
        )
        .where('QuestionModel.helpedAt IS NOT NULL'),
      filters,
    ).getRawOne();
  }

  addFilters(queryBuilder, filters): SelectQueryBuilder<QuestionModel> {
    filters.forEach((filter) => {
      if (!this.possibleFilters.includes(filter.type)) {
        throw new Error(
          `${filter} is not a possbile filter for "${this.name}"`,
        );
      }
      switch (filter.type) {
        case 'courseId':
          queryBuilder
            .innerJoin('QuestionModel.queue', 'queue')
            .andWhere(`queue.${filter.conditional}`);
      }
    });
    return queryBuilder;
  }
}

export const INSIGHTS = {
  totalUsers: new TotalUsers(),
  totalQuestionsAsked: new TotalQuestionsAsked(),
  averageWaitTime: new AverageWaitTime(),
  questionTypeBreakdown: new QuestionTypeBreakdown(),
};
