import {
  HeatmapInsightOutputType,
  InsightComponent,
  InsightObject,
  Role,
} from '@koh/common';
import { QuestionModel } from 'question/question.entity';
import { createQueryBuilder } from 'typeorm';
import { addFilters } from './insight-utils';

export const WeeklyPopularTimes: InsightObject = {
  displayName: 'Weekly Wait Time Heatmap',
  description:
    'How long do students have to wait in the queue to get their question answered?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.InsightHeatmap,
  size: 'default' as const,
  async compute(filters): Promise<HeatmapInsightOutputType> {
    const _questions = await addFilters({
      query: createQueryBuilder(QuestionModel)
        .select()
        .where(
          'QuestionModel.helpedAt IS NOT NULL AND QuestionModel.closedAt IS NOT NULL',
        ),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    }).getRawMany();

    return false;
  },
};
