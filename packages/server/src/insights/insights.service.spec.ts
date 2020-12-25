import { QuestionType } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import {
  CourseFactory,
  QuestionFactory,
  QueueFactory,
  UserCourseFactory,
} from '../../test/util/factories';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { INSIGHTS_MAP } from './insights';
import { InsightsService } from './insights.service';

describe('InsightsService', () => {
  let service: InsightsService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [InsightsService],
    }).compile();

    service = module.get<InsightsService>(InsightsService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('generateInsight', () => {
    it('totalStudents', async () => {
      const course = await CourseFactory.create();
      await UserCourseFactory.createList(4, { course });
      await UserCourseFactory.create();

      const res = await service.generateInsight({
        insight: INSIGHTS_MAP.TotalStudents,
        filters: [
          {
            type: 'courseId',
            courseId: course.id,
          },
        ],
      });
      expect(res.output).toEqual(4);
    });

    it('totalQuestionsAsked', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course });
      // questions in the past
      await QuestionFactory.createList(6, {
        queue,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      });
      // question right now
      await QuestionFactory.create({ queue });

      const res = await service.generateInsight({
        insight: INSIGHTS_MAP.TotalQuestionsAsked,
        filters: [
          {
            type: 'courseId',
            courseId: course.id,
          },
          {
            type: 'timeframe',
            start: new Date(Date.now() - 36 * 60 * 1000),
            end: new Date(Date.now() - 6 * 60 * 1000),
          },
        ],
      });
      expect(res.output).toEqual(6);
    });

    it('averageWaitTime', async () => {
      const question = await QuestionFactory.create({
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        helpedAt: new Date(Date.now() - 25 * 60 * 1000),
      });

      const res = await service.generateInsight({
        insight: INSIGHTS_MAP.AverageWaitTime,
        filters: [
          {
            type: 'courseId',
            courseId: question.queue.courseId,
          },
        ],
      });
      expect(res.output.avgWaitTimeInMinutes).toBeCloseTo(5);
    });
  });

  it('questionTypeBreakdown', async () => {
    const course = await CourseFactory.create();
    const queue = await QueueFactory.create({ course });
    await QuestionFactory.createList(8, {
      questionType: QuestionType.Bug,
      queue,
    });
    await QuestionFactory.createList(20, {
      questionType: QuestionType.Clarification,
      queue,
    });
    await QuestionFactory.createList(10, {
      questionType: QuestionType.Testing,
      queue,
    });
    const res = await service.generateInsight({
      insight: INSIGHTS_MAP.QuestionTypeBreakdown,
      filters: [
        {
          type: 'courseId',
          courseId: course.id,
        },
      ],
    });

    expect(res.output.data).toEqual([
      { questionType: 'Bug', totalQuestions: '8' },
      { questionType: 'Clarification', totalQuestions: '20' },
      { questionType: 'Concept', totalQuestions: '0' },
      { questionType: 'Other', totalQuestions: '0' },
      { questionType: 'Setup', totalQuestions: '0' },
      { questionType: 'Testing', totalQuestions: '10' },
    ]);
  });

  describe('generateAllInsights', () => {
    it('multiple insights', async () => {
      const course = await CourseFactory.create();
      await UserCourseFactory.createList(4, { course });
      await UserCourseFactory.create();
      const queue = await QueueFactory.create({ course });
      await QuestionFactory.createList(18, { queue });

      const res = await service.generateAllInsights({
        insights: [
          INSIGHTS_MAP.TotalStudents,
          INSIGHTS_MAP.TotalQuestionsAsked,
        ],
        filters: [
          {
            type: 'courseId',
            courseId: course.id,
          },
        ],
      });
      expect(res.totalStudents.output).toEqual(4);
      expect(res.totalQuestionsAsked.output).toEqual(18);
    });
  });
});
