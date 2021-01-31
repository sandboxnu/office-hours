import {
  InsightDisplay,
  PossibleOutputTypes,
  QuestionType,
  Role,
  SimpleChartOutputType,
  SimpleDisplayOutputType,
} from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { QuestionModel } from 'question/question.entity';
import { createQueryBuilder, SelectQueryBuilder } from 'typeorm';

export interface InsightInterface<Model> {
  displayName: string;
  description: string;
  roles: Role[];
  component: InsightDisplay;
  possibleFilters: string[];
  compute: (
    queryBuilder: SelectQueryBuilder<Model>,
    insightFilters: any,
  ) => Promise<PossibleOutputTypes>;
  output?: Promise<PossibleOutputTypes>;
  size: 'default' | 'small';
}

function addFilters(
  queryBuilder: SelectQueryBuilder<any>,
  modelName: string,
  filters,
  possibleFilters,
): SelectQueryBuilder<QuestionModel> {
  for (const filter of filters) {
    if (possibleFilters.includes(filter.type)) {
      FILTER_MAP[modelName][filter.type](queryBuilder, filter);
    }
  }
  return queryBuilder;
}

const FILTER_MAP = {
  QuestionModel: {
    courseId: (queryBuilder, filter) => {
      queryBuilder
        .innerJoin('QuestionModel.queue', 'queue')
        .andWhere('queue."courseId" = :courseId', {
          courseId: filter.courseId,
        });
    },
    timeframe: (queryBuilder, filter) => {
      queryBuilder.andWhere('QuestionModel.createdAt BETWEEN :start AND :end', {
        start: filter.start,
        end: filter.end,
      });
    },
  },
  UserCourseModel: {
    courseId: (queryBuilder, filter) => {
      queryBuilder.andWhere('"courseId" = :courseId', {
        courseId: filter.courseId,
      });
    },
  },
};

export class TotalStudents implements InsightInterface<UserCourseModel> {
  displayName = 'Total Students';
  description = 'Gets the total number of students';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  possibleFilters = ['courseId', 'role'];
  size = 'small' as const;

  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters(
      createQueryBuilder(UserCourseModel).where("role = 'student'"),
      UserCourseModel.name,
      filters,
      this.possibleFilters,
    ).getCount();
  }
}

export class TotalQuestionsAsked implements InsightInterface<QuestionModel> {
  displayName = 'Total Questions Asked';
  description = 'Gets the total number questions asked';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'small' as const;

  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters(
      createQueryBuilder(QuestionModel).where('TRUE'),
      QuestionModel.name,
      filters,
      this.possibleFilters,
    ).getCount();
  }
}

// WIP
export class QuestionTypeBreakdown implements InsightInterface<QuestionModel> {
  displayName = 'Question Type Breakdown';
  description =
    'Returns a table of each question type and how many questions of that type were asked';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleChart;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'default' as const;

  async compute(filters): Promise<SimpleChartOutputType> {
    const info = await addFilters(
      createQueryBuilder(QuestionModel)
        .select('"QuestionModel"."questionType"', 'questionType')
        .addSelect('COUNT(*)', 'totalQuestions')
        .andWhere('"QuestionModel"."questionType" IS NOT NULL'),
      QuestionModel.name,
      filters,
      this.possibleFilters,
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
}

export class AverageWaitTime implements InsightInterface<QuestionModel> {
  displayName = 'Average Wait Time';
  description = 'Gets the average wait time';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'default' as const;

  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters(
      createQueryBuilder(QuestionModel)
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.helpedAt - QuestionModel.createdAt)::INTERVAL)/60',
          'avgWaitTimeInMinutes',
        )
        .where('QuestionModel.helpedAt IS NOT NULL'),
      QuestionModel.name,
      filters,
      this.possibleFilters,
    ).getRawOne();
  }
}

export const INSIGHTS_MAP = {
  [TotalStudents.name]: new TotalStudents(),
  [TotalQuestionsAsked.name]: new TotalQuestionsAsked(),
  [AverageWaitTime.name]: new AverageWaitTime(),
  [QuestionTypeBreakdown.name]: new QuestionTypeBreakdown(),
};
