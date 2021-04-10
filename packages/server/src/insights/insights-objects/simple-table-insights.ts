import {
  InsightComponent,
  InsightObject,
  Role,
  SimpleTableOutputType,
} from '@koh/common';
import { UserModel } from 'profile/user.entity';
import { QuestionModel } from 'question/question.entity';
import { createQueryBuilder } from 'typeorm';
import { addFilters } from './insight-utils';

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
