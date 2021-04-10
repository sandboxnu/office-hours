import {
  InsightObject,
  Role,
  InsightComponent,
  BarChartOutputType,
  QuestionType,
} from '@koh/common';
import { QuestionModel } from 'question/question.entity';
import { createQueryBuilder } from 'typeorm';
import { addFilters } from './insight-utils';

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
