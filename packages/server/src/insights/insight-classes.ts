import {
  BarChartOutputType,
  InsightDisplay,
  PossibleOutputTypes,
  QuestionType,
  Role,
  SimpleDisplayOutputType,
  SimpleTableOutputType,
} from '@koh/common';
import { UserCourseModel } from 'profile/user-course.entity';
import { UserModel } from 'profile/user.entity';
import { QuestionModel } from 'question/question.entity';
import { createQueryBuilder, SelectQueryBuilder } from 'typeorm';

export interface InsightInterface {
  displayName: string;
  description: string;
  roles: Role[];
  component: InsightDisplay;
  possibleFilters: string[];
  compute: (
    insightFilters: any,
  ) => Promise<PossibleOutputTypes>;
  output?: Promise<PossibleOutputTypes>;
  size: 'default' | 'small';
}

export type Filter = {
  type: string;
  [x: string]: any;
}

type AddFiltersParams = {
  queryBuilder: SelectQueryBuilder<any>;
  modelName: string;
  filters: Filter[];
  possibleFilters: string[];
}

function addFilters({
  queryBuilder,
  modelName,
  filters,
  possibleFilters,
}: AddFiltersParams): SelectQueryBuilder<QuestionModel> {
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

export const TotalStudents: InsightInterface = {
  displayName: 'Total Students',
  description: 'Gets the total number of students',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.SimpleDisplay,
  possibleFilters: ['courseId', 'role'],
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters({
      queryBuilder: createQueryBuilder(UserCourseModel).where("role = 'student'"),
      modelName: UserCourseModel.name,
      possibleFilters: this.possibleFilters,
      filters,
    }).getCount();
  }
}

export const TotalQuestionsAsked: InsightInterface = {
  displayName: 'Total Questions',
  description: 'Gets the total number questions asked',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.SimpleDisplay,
  possibleFilters: ['courseId', 'timeframe'],
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters({
      queryBuilder: createQueryBuilder(QuestionModel).where('TRUE'),
      modelName: QuestionModel.name,
      possibleFilters: this.possibleFilters,
      filters,
    }).getCount();
  }
}

export const MostActiveStudents: InsightInterface = {
  displayName: 'Most Active Students',
  description: 'Returns a table of the students who have asked the most questions in Office Hours',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.SimpleTable,
  possibleFilters: ['courseId', 'timeframe'],
  size: 'default' as const,
  async compute(filters): Promise<SimpleTableOutputType> {
    const dataSource = await addFilters({
      queryBuilder: createQueryBuilder()
        .select('"QuestionModel"."creatorId"', 'studentId')
        .addSelect('"UserModel"."name"', 'name')
        .addSelect('"UserModel"."email"', 'email')
        .addSelect('COUNT(*)', 'questionsAsked')
        .from(QuestionModel, 'QuestionModel')
        .where('"QuestionModel"."questionType" IS NOT NULL'),
      modelName: QuestionModel.name,
      possibleFilters: this.possibleFilters,
      filters,
    })
      .innerJoin(
        UserModel,
        'UserModel',
        '"UserModel".id = "QuestionModel"."creatorId"',
      )
      .groupBy('"QuestionModel"."creatorId"')
      .addGroupBy('"UserModel".name')
      .addGroupBy('"UserModel".email')
      .orderBy('4', 'DESC')
      .limit(75)
      .getRawMany();

    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Questions Asked',
          dataIndex: 'questionsAsked',
          key: 'questionsAsked',
        },
      ],
      dataSource,
    };
  }
}

export const QuestionTypeBreakdown: InsightInterface = {
  displayName: 'Question Type Breakdown',
  description: 'Returns a table of each question type and how many questions of that type were asked',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.BarChart,
  possibleFilters: ['courseId', 'timeframe'],
  size: 'default' as const,
  async compute(filters): Promise<BarChartOutputType> {
    const info = await addFilters({
      queryBuilder: createQueryBuilder(QuestionModel)
        .select('"QuestionModel"."questionType"', 'questionType')
        .addSelect('COUNT(*)', 'totalQuestions')
        .andWhere('"QuestionModel"."questionType" IS NOT NULL'),
      modelName: QuestionModel.name,
      possibleFilters: this.possibleFilters,
      filters,
    })
      .groupBy('"QuestionModel"."questionType"')
      .having('"QuestionModel"."questionType" IS NOT NULL')
      .getRawMany();

    const typesFromInfo = info.map((obj) => obj['questionType']);

    Object.values(QuestionType).forEach((v) => {
      if (!typesFromInfo.includes(v)) {
        info.push({ questionType: v, totalQuestions: 0 });
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
      xField: 'totalQuestions',
      yField: 'questionType',
      seriesField: 'questionType',
      xAxisName: 'questionType',
      yAxisName: 'totalQuestions',
    };
    return insightObj;
  }
}

export const AverageWaitTime: InsightInterface = {
  displayName: 'Avg Wait Time',
  description: 'Gets the average wait time',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.SimpleDisplay,
  possibleFilters: ['courseId', 'timeframe'],
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    const waitTime = await addFilters({
      queryBuilder: createQueryBuilder(QuestionModel)
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.helpedAt - QuestionModel.createdAt)::INTERVAL)/60',
          'avgWaitTimeInMinutes',
        )
        .where('QuestionModel.helpedAt IS NOT NULL'),
      modelName: QuestionModel.name,
      possibleFilters: this.possibleFilters,
      filters,
    }).getRawOne();
    return `${Math.floor(waitTime.avgWaitTimeInMinutes)} min`;
  }
}

export const AverageHelpingTime: InsightInterface = {
  displayName: 'Avg Helping Time',
  description: 'Gets the average helping time',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.SimpleDisplay,
  possibleFilters: ['courseId', 'timeframe'],
  size: 'small' as const,

  async compute(filters): Promise<SimpleDisplayOutputType> {
    const helpTime = await addFilters({
      queryBuilder: createQueryBuilder(QuestionModel)
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.closedAt - QuestionModel.helpedAt)::INTERVAL)/60',
          'avgHelpTimeInMinutes',
        )
        .where(
          'QuestionModel.helpedAt IS NOT NULL AND QuestionModel.closedAt IS NOT NULL',
        ),
      modelName: QuestionModel.name,
      possibleFilters: this.possibleFilters,
      filters,
    }).getRawOne();
    return `${Math.floor(helpTime.avgHelpTimeInMinutes)} min`;
  }
}

export const QuestionToStudentRatio: InsightInterface = {
  displayName: 'Questions per Student',
  description: 'How many questions were asked per student on average?',
  roles: [Role.PROFESSOR],
  component: InsightDisplay.SimpleDisplay,
  possibleFilters: ['courseId', 'timeframe'],
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    const totalQuestions = await TotalQuestionsAsked.compute(filters);
    const totalStudents = await TotalStudents.compute(filters);
    return totalStudents !== 0
      ? (totalQuestions as number) / (totalStudents as number)
      : '0 students';
  }
}

export const INSIGHTS_MAP = {
  TotalStudents,
  TotalQuestionsAsked,
  AverageWaitTime,
  QuestionTypeBreakdown,
  MostActiveStudents,
  QuestionToStudentRatio,
  AverageHelpingTime
};
