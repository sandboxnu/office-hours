import {
  HeatmapInsightOutputType,
  InsightComponent,
  InsightObject,
  Role,
} from '@koh/common';
import { CourseModel } from 'course/course.entity';
import { generateHeatMapWithReplay } from 'course/heatmap_utils';
import { OfficeHourModel } from 'course/office-hour.entity';
import { QuestionModel } from 'question/question.entity';
import { createQueryBuilder } from 'typeorm';
import { addFilters, Filter } from './insight-utils';

export const WeeklyPopularTimes: InsightObject = {
  displayName: 'Weekly Wait Time Heatmap',
  description:
    'How long do students have to wait in the queue to get their question answered?',
  roles: [Role.PROFESSOR],
  component: InsightComponent.InsightHeatmap,
  size: 'default' as const,
  async compute(filters: Filter[]): Promise<HeatmapInsightOutputType> {
    console.log('ligma, here');
    const questions = await addFilters({
      query: createQueryBuilder(QuestionModel)
        .select()
        .where(
          'QuestionModel.closedAt IS NOT NULL AND QuestionModel.firstHelpedAt IS NOT NULL',
        ),
      modelName: QuestionModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    }).getRawMany();

    console.log('got questions bitch');

    const officeHours = await addFilters({
      query: createQueryBuilder(OfficeHourModel).select(),
      modelName: OfficeHourModel.name,
      allowedFilters: ['courseId', 'timeframe'],
      filters,
    }).getRawMany();

    const courseIdFilter = filters.find((f) => f.type === 'courseId');

    let tz = 'America/New_York';
    if (courseIdFilter) {
      const courseId = courseIdFilter['courseId'];
      tz = await (await CourseModel.findOne(courseId)).timezone;
    }

    const heatmapShit = generateHeatMapWithReplay(
      questions,
      officeHours,
      tz,
      7 * 24 * 60,
      7 * 24,
    );

    console.log('heatmap', heatmapShit);

    const yLabel = 'Hour';
    const xLabel = 'Day of Week';

    return false;
  },
};
