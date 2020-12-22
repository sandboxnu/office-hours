import {
  InsightDisplay,
  PossibleOutputTypes,
  QuestionType,
  Role,
  SimpleChartOutputType,
  SimpleDisplayOutputType,
  TACheckInTimesOutputType,
} from '@koh/common';
import { EventModel } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { QuestionModel } from 'question/question.entity';
import { SelectQueryBuilder } from 'typeorm';

enum InsightSize {
  SMALL = 'small',
}

export interface InsightInterface<Model> {
  name: string;
  displayName: string;
  description: string;
  roles: Role[];
  component: InsightDisplay;
  model: new () => Model; // One of the modals have
  possibleFilters: string[];
  size: InsightSize;
  compute: (
    queryBuilder: SelectQueryBuilder<Model>,
    insightFilters: any,
  ) => Promise<PossibleOutputTypes>;
  output?: Promise<PossibleOutputTypes>;
}

function addFilters(
  queryBuilder,
  modelName,
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

class TotalStudents implements InsightInterface<UserCourseModel> {
  name = 'totalStudents';
  displayName = 'Total Students';
  description = 'Gets the total number of students';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  model = UserCourseModel;
  possibleFilters = ['courseId', 'role'];

  async compute(
    queryBuilder: SelectQueryBuilder<UserCourseModel>,
    filters,
  ): Promise<SimpleDisplayOutputType> {
    return await addFilters(
      queryBuilder.where("role = 'student'"),
      this.model.name,
      filters,
      this.possibleFilters,
    ).getCount();
  }
}

class TotalQuestionsAsked implements InsightInterface<QuestionModel> {
  name = 'totalQuestionsAsked';
  displayName = 'Total Questions Asked';
  description = 'Gets the total number questions asked';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  model = QuestionModel;
  possibleFilters = ['courseId', 'timeframe'];

  async compute(
    queryBuilder: SelectQueryBuilder<QuestionModel>,
    filters,
  ): Promise<SimpleDisplayOutputType> {
    return await addFilters(
      queryBuilder.where('TRUE'),
      this.model.name,
      filters,
      this.possibleFilters,
    ).getCount();
  }
}

// WIP
class QuestionTypeBreakdown implements InsightInterface<QuestionModel> {
  name = 'questionTypeBreakdown';
  displayName = 'Question Type Breakdown';
  description =
    'Returns a table of each question type and how many questions of that type were asked';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleChart;
  model = QuestionModel;
  possibleFilters = ['courseId', 'timeframe'];

  async compute(
    queryBuilder: SelectQueryBuilder<QuestionModel>,
    filters,
  ): Promise<SimpleChartOutputType> {
    const info = await addFilters(
      queryBuilder
        .select('"QuestionModel"."questionType"', 'questionType')
        .addSelect('COUNT(*)', 'totalQuestions')
        .andWhere('"QuestionModel"."questionType" IS NOT NULL'),
      this.model.name,
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

class AverageWaitTime implements InsightInterface<QuestionModel> {
  name = 'averageWaitTime';
  displayName = 'Average Wait Time';
  description = 'Gets the average wait time';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.SimpleDisplay;
  model = QuestionModel;
  possibleFilters = ['courseId', 'timeframe'];

  async compute(
    queryBuilder: SelectQueryBuilder<QuestionModel>,
    filters,
  ): Promise<SimpleDisplayOutputType> {
    return await addFilters(
      queryBuilder
        .select(
          'EXTRACT(EPOCH FROM AVG(QuestionModel.helpedAt - QuestionModel.createdAt)::INTERVAL)/60',
          'avgWaitTimeInMinutes',
        )
        .where('QuestionModel.helpedAt IS NOT NULL'),
      this.model.name,
      filters,
      this.possibleFilters,
    ).getRawOne();
  }
}

class TACheckInTimes implements InsightInterface<EventModel> {
  name = 'taCheckInTimes';
  displayName = 'TA Check In Times';
  description = 'Get the times a TA checked in';
  roles = [Role.PROFESSOR];
  component = InsightDisplay.TACheckInTimes;
  model = EventModel;
  possibleFilters = ['courseId'];

  async compute(
    queryBuilder: SelectQueryBuilder<EventModel>,
    filters,
  ): Promise<TACheckInTimesOutputType> {
    return {};
  }
}

export const INSIGHTS = {
  totalStudents: new TotalStudents(),
  totalQuestionsAsked: new TotalQuestionsAsked(),
  averageWaitTime: new AverageWaitTime(),
  questionTypeBreakdown: new QuestionTypeBreakdown(),
  taCheckInTimes: new TACheckInTimes(),
};
