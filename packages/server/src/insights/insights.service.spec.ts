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
import { totalUsers, totalQuestionsAsked, averageWaitTime } from './insights';

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
        insights: [totalUsers],
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
      await QuestionFactory.createList(8, { queue });

      const res = await service.generateInsightsFor({
        insights: [totalQuestionsAsked],
        filters: [
          {
            type: 'courseId',
            conditional: `"courseId" = ${course.id}`,
          },
        ],
      });
      expect(res.totalQuestionsAsked.output).toEqual(8);
    });

    it('averageWaitTime', async () => {
      await QuestionFactory.create({
        createdAt: new Date(),
        helpedAt: new Date(Date.now() + 32 * 60 * 1000),
      });

      const res = await service.generateInsightsFor({
        insights: [averageWaitTime],
        filters: [],
      });
      expect(res.averageWaitTime.output).toEqual({
        averageWaitTime: { minutes: 32 },
      });
    });
  });
});
