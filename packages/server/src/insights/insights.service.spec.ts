import { Test, TestingModule } from '@nestjs/testing';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import {
  UserCourseFactory,
  QuestionFactory,
  CourseFactory,
  QueueFactory,
} from '../../test/util/factories';
import { INSIGHTS } from './insights';

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

  describe('generateInsightsFor', () => {
    it('totalStudents', async () => {
      const course = await CourseFactory.create();
      await UserCourseFactory.createList(4, { course });
      await UserCourseFactory.create();

      const res = await service.generateInsightsFor({
        insights: [INSIGHTS.totalUsers],
        filters: [
          {
            type: 'courseId',
            conditional: `"courseId" = ${course.id}`,
          },
        ],
      });
      expect(res.totalStudents.output).toEqual(4);
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

      const res = await service.generateInsightsFor({
        insights: [INSIGHTS.totalQuestionsAsked],
        filters: [
          {
            type: 'courseId',
            conditional: `"courseId" = ${course.id}`,
          },
          {
            type: 'timeframe',
            start: new Date(Date.now() - 36 * 60 * 1000),
            end: new Date(Date.now() - 6 * 60 * 1000),
          },
        ],
      });
      expect(res.totalQuestionsAsked.output).toEqual(6);
    });

    it('averageWaitTime', async () => {
      const question = await QuestionFactory.create({
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        helpedAt: new Date(Date.now() - 25 * 60 * 1000),
      });

      const res = await service.generateInsightsFor({
        insights: [INSIGHTS.averageWaitTime],
        filters: [
          {
            type: 'courseId',
            conditional: `"courseId" = ${question.queue.courseId}`,
          },
        ],
      });
      expect(res.averageWaitTime.output).toEqual({
        avgWaitTimeInMinutes: 5,
      });
    });
  });

  it.only('questionTypeBreakdown', async () => {
    const course = await CourseFactory.create();
    const queue = await QueueFactory.create({ course });
    for (let i = 0; i < 8; i++) {
      await QuestionFactory.create({ status: QuestionStatusKeys.Stale, queue });
    }
    for (let i = 0; i < 20; i++) {
      await QuestionFactory.create({
        status: QuestionStatusKeys.Resolved,
        queue,
      });
    }
    for (let i = 0; i < 22; i++) {
      await QuestionFactory.create({
        status: QuestionStatusKeys.ConfirmedDeleted,
        queue,
      });
    }
    const res = await service.generateInsightsFor({
      insights: [INSIGHTS.questionTypeBreakdown],
      filters: [
        {
          type: 'courseId',
          conditional: `"courseId" = ${course.id}`,
        },
      ],
    });
    console.log(res.questionTypeBreakdown.output);
    // expect(res.totalStudents.output).toEqual();
  });
});
