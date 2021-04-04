import {
  BarChartOutputType,
  InsightComponent,
  InsightObject,
  QuestionType,
  Role,
  SimpleDisplayOutputType,
  SimpleTableOutputType,
} from '@koh/common';
import { UserCourseModel } from '../profile/user-course.entity';
import { UserModel } from '../profile/user.entity';
import { QuestionModel } from '../question/question.entity';
import { createQueryBuilder, SelectQueryBuilder } from 'typeorm';

export type Filter = {
  type: string;
  [x: string]: any;
};

type AddFiltersParams = {
  query: SelectQueryBuilder<any>;
  modelName: string;
  allowedFilters: string[];
  filters: Filter[];
};

function addFilters({
  query,
  modelName,
  allowedFilters,
  filters,
}: AddFiltersParams): SelectQueryBuilder<QuestionModel> {
  for (const filter of filters) {
    if (allowedFilters.includes(filter.type)) {
      APPLY_FILTER_MAP[modelName][filter.type]({ query, filter });
    }
  }
  return query;
}

type ApplyFilterParams = {
  query: SelectQueryBuilder<any>;
  filter: Filter;
};

const APPLY_FILTER_MAP = {
  QuestionModel: {
    courseId: ({ query, filter }: ApplyFilterParams) => {
      query
        .innerJoin('QuestionModel.queue', 'queue')
        .andWhere('queue."courseId" = :courseId', {
          courseId: filter.courseId,
        });
    },
    timeframe: ({ query, filter }: ApplyFilterParams) => {
      query.andWhere('QuestionModel.createdAt BETWEEN :start AND :end', {
        start: filter.start,
        end: filter.end,
      });
    },
  },
  UserCourseModel: {
    courseId: ({ query, filter }: ApplyFilterParams) => {
      query.andWhere('"courseId" = :courseId', {
        courseId: filter.courseId,
      });
    },
  },
};

export const TotalStudents: InsightObject = {
  displayName: 'Total Students',
  description:
    'What is the total number of students that are enrolled in the course?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.SimpleDisplay,
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters({
      query: createQueryBuilder(UserCourseModel).where("role = 'student'"),
      modelName: UserCourseModel.name,
      allowedFilters: ['courseId', 'role'],
      filters,
    }).getCount();
  },
};

export const TotalQuestionsAsked: InsightObject = {
  displayName: 'Total Questions',
  description: 'How many questions have been asked in total?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.SimpleDisplay,
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    return await addFilters({
      query: createQueryBuilder(QuestionModel).where('TRUE'),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    }).getCount();
  },
};

export const MostActiveStudents: InsightObject = {
  displayName: 'Most Active Students',
  description:
    'Who are the students who have asked the most questions in Office Hours? (limit 75)',
  roles: [Role.PROFESSOR],
  component: InsightComponent.SimpleTable,
  size: 'default' as const,
  async compute(filters): Promise<SimpleTableOutputType> {
    const dataSource = await addFilters({
      query: createQueryBuilder()
        .select('"QuestionModel"."creatorId"', 'studentId')
        .addSelect(
          'concat("UserModel"."firstName", \' \',"UserModel"."lastName")',
          'name',
        )
        .addSelect('"UserModel"."email"', 'email')
        .addSelect('COUNT(*)', 'questionsAsked')
        .from(QuestionModel, 'QuestionModel')
        .where('"QuestionModel"."questionType" IS NOT NULL'),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    })
      .innerJoin(
        UserModel,
        'UserModel',
        '"UserModel".id = "QuestionModel"."creatorId"',
      )
      .groupBy('"QuestionModel"."creatorId"')
      .addGroupBy('name')
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
  },
};

export const QuestionTypeBreakdown: InsightObject = {
  displayName: 'Question Type Breakdown',
  description:
    'What is the distribution of student-selected question-types on the question form?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.BarChart,
  size: 'default' as const,
  async compute(filters): Promise<BarChartOutputType> {
    const info = await addFilters({
      query: createQueryBuilder(QuestionModel)
        .select('"QuestionModel"."questionType"', 'questionType')
        .addSelect('COUNT(*)', 'totalQuestions')
        .andWhere('"QuestionModel"."questionType" IS NOT NULL'),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    })
      .groupBy('"QuestionModel"."questionType"')
      .having('"QuestionModel"."questionType" IS NOT NULL')
      .getRawMany();

    const typesFromInfo = info.map((obj) => obj['questionType']);

    info.forEach((pair) => {
      pair['totalQuestions'] = Number.parseInt(pair['totalQuestions']);
    });

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
      xAxisName: 'totalQuestions',
      yAxisName: 'questionType',
    };
    return insightObj;
  },
};

export const AverageWaitTime: InsightObject = {
  displayName: 'Avg Wait Time',
  description:
    'What is the average wait time for a student to get help in the queue?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.SimpleDisplay,
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    const waitTime = await addFilters({
      query: createQueryBuilder(QuestionModel)
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.firstHelpedAt - QuestionModel.createdAt)::INTERVAL)/60',
          'avgWaitTimeInMinutes',
        )
        .where('QuestionModel.firstHelpedAt IS NOT NULL'),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    }).getRawOne();
    return `${Math.floor(waitTime.avgWaitTimeInMinutes)} min`;
  },
};

export const AverageHelpingTime: InsightObject = {
  displayName: 'Avg Helping Time',
  description:
    'What is the average duration that a TA help a student on a call?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.SimpleDisplay,
  size: 'small' as const,

  async compute(filters): Promise<SimpleDisplayOutputType> {
    const helpTime = await addFilters({
      query: createQueryBuilder(QuestionModel)
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.closedAt - QuestionModel.helpedAt)::INTERVAL)/60',
          'avgHelpTimeInMinutes',
        )
        .where(
          'QuestionModel.helpedAt IS NOT NULL AND QuestionModel.closedAt IS NOT NULL',
        ),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    }).getRawOne();
    return `${Math.floor(helpTime.avgHelpTimeInMinutes)} min`;
  },
};

export const QuestionToStudentRatio: InsightObject = {
  displayName: 'Questions per Student',
  description: 'How many questions were asked per student on average?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.SimpleDisplay,
  size: 'small' as const,
  async compute(filters): Promise<SimpleDisplayOutputType> {
    const totalQuestions = await TotalQuestionsAsked.compute(filters);
    const totalStudents = await TotalStudents.compute(filters);
    return totalStudents !== 0
      ? ((totalQuestions as number) / (totalStudents as number)).toFixed(2)
      : '0 students';
  },
};

export const INSIGHTS_MAP = {
  TotalStudents,
  TotalQuestionsAsked,
  AverageWaitTime,
  QuestionTypeBreakdown,
  MostActiveStudents,
  QuestionToStudentRatio,
  AverageHelpingTime,
};
