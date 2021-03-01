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
import { strategy } from 'sharp';
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
  displayName = 'Total Questions';
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

export class MostActiveStudents implements InsightInterface<QuestionModel> {
  displayName = 'Most Active Students';
  description =
    'Returns a table of the students who have asked the most questions in Office Hours';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleTable;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'default' as const;

  async compute(filters): Promise<SimpleTableOutputType> {
    const dataSource = await addFilters(
      createQueryBuilder()
        .select('"QuestionModel"."creatorId"', 'studentId')
        .addSelect('"UserModel"."name"', 'name')
        .addSelect('"UserModel"."email"', 'email')
        .addSelect('COUNT(*)', 'questionsAsked')
        .from(QuestionModel, 'QuestionModel')
        .where('"QuestionModel"."questionType" IS NOT NULL'),
      QuestionModel.name,
      filters,
      this.possibleFilters,
    )
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

export class QuestionTypeBreakdown implements InsightInterface<QuestionModel> {
  displayName = 'Question Type Breakdown';
  description =
    'Returns a table of each question type and how many questions of that type were asked';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.BarChart;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'default' as const;

  async compute(filters): Promise<BarChartOutputType> {
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

export class AverageWaitTime implements InsightInterface<QuestionModel> {
  displayName = 'Avg Wait Time';
  description = 'Gets the average wait time';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'small' as const;

  async compute(filters): Promise<SimpleDisplayOutputType> {
    const waitTime = await addFilters(
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
    return `${Math.floor(waitTime.avgWaitTimeInMinutes)} min`;
  }
}

export class AverageHelpingTime extends AverageWaitTime {
  displayName = 'Avg Helping Time';
  description = 'Gets the average helping time';

  async compute(filters): Promise<SimpleDisplayOutputType> {
    const helpTime = await addFilters(
      createQueryBuilder(QuestionModel)
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.closedAt - QuestionModel.helpedAt)::INTERVAL)/60',
          'avgHelpTimeInMinutes',
        )
        .where(
          'QuestionModel.helpedAt IS NOT NULL AND QuestionModel.closedAt IS NOT NULL',
        ),
      QuestionModel.name,
      filters,
      this.possibleFilters,
    ).getRawOne();
    return `${Math.floor(helpTime.avgHelpTimeInMinutes)} min`;
  }
}

export class QuestionToStudentRatio implements InsightInterface<QuestionModel> {
  displayName = 'Questions per Student';
  description = 'How many questions were asked per student on average?';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  possibleFilters = ['courseId', 'timeframe'];
  size = 'small' as const;

  async compute(filters): Promise<SimpleDisplayOutputType> {
    const totalQuestions = await new TotalQuestionsAsked().compute(filters);
    const totalStudents = await new TotalStudents().compute(filters);
    return totalStudents !== 0
      ? (totalQuestions as number) / (totalStudents as number)
      : '0 students';
  }
}

export const INSIGHTS_MAP = {
  [TotalStudents.name]: new TotalStudents(),
  [TotalQuestionsAsked.name]: new TotalQuestionsAsked(),
  [AverageWaitTime.name]: new AverageWaitTime(),
  [QuestionTypeBreakdown.name]: new QuestionTypeBreakdown(),
  [MostActiveStudents.name]: new MostActiveStudents(),
  [QuestionToStudentRatio.name]: new QuestionToStudentRatio(),
  [AverageHelpingTime.name]: new AverageHelpingTime(),
};
