import { Test, TestingModule } from '@nestjs/testing';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import {
  UserCourseFactory,
  QuestionFactory,
  CourseFactory,
  QueueFactory,
  UserFactory,
} from '../../test/util/factories';
import { INSIGHTS_MAP } from './insight-objects';
import { QuestionType } from '@koh/common';
import { UserModel } from 'profile/user.entity';

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

  describe('computeOutput', () => {
    it('totalStudents', async () => {
      const course = await CourseFactory.create();
      await UserCourseFactory.createList(4, { course });
      await UserCourseFactory.create();

      const res = await service.computeOutput({
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

      const res = await service.computeOutput({
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

      const res = await service.computeOutput({
        insight: INSIGHTS_MAP.AverageWaitTime,
        filters: [
          {
            type: 'courseId',
            courseId: question.queue.courseId,
          },
        ],
      });
      expect(res.output).toEqual('5 min');
    });

    it('averageHelpingTime', async () => {
      // 5 min of helping
      const question = await QuestionFactory.create({
        helpedAt: new Date(Date.now() - 30 * 60 * 1000),
        closedAt: new Date(Date.now() - 25 * 60 * 1000),
      });
      // 15 min of helping
      const question2 = await QuestionFactory.create({
        helpedAt: new Date(Date.now() - 50 * 60 * 1000),
        closedAt: new Date(Date.now() - 35 * 60 * 1000),
        queue: question.queue,
      });

      const res = await service.computeOutput({
        insight: INSIGHTS_MAP.AverageHelpingTime,
        filters: [
          {
            type: 'courseId',
            courseId: question.queue.courseId,
          },
        ],
      });
      expect(res.output).toEqual('10 min');
    });

    it('questionToStudentRatio', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course });
      // questions in the past
      await QuestionFactory.createList(20, {
        queue,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
      });
      // question right now
      await QuestionFactory.create({ queue });
      // students in the class
      await UserCourseFactory.createList(4, { course });

      const res = await service.computeOutput({
        insight: INSIGHTS_MAP.QuestionToStudentRatio,
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
      expect(res.output).toEqual(5);
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
    const res = await service.computeOutput({
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
      { questionType: 'Concept', totalQuestions: 0 },
      { questionType: 'Other', totalQuestions: 0 },
      { questionType: 'Setup', totalQuestions: 0 },
      { questionType: 'Testing', totalQuestions: '10' },
    ]);
  });

  it('mostActiveStudents', async () => {
    const course = await CourseFactory.create();
    const queue = await QueueFactory.create({ course });
    const user1 = await UserFactory.create({
      id: 1,
      name: 'Derek Jeter',
      email: 'jeter.d@northeastern.edu',
    });
    const user2 = await UserFactory.create({
      id: 2,
      name: 'David Wright',
      email: 'wright.da@northeastern.edu',
    });
    const user3 = await UserFactory.create({
      id: 3,
      name: 'Adam Smith',
      email: 'smith.a@northeastern.edu',
    });
    const user4 = await UserFactory.create({
      id: 4,
      name: 'Jean Valjean',
      email: 'valjean.j@protonmail.com',
    });
    await QuestionFactory.createList(8, {
      creator: user1,
      queue,
    });
    await QuestionFactory.createList(20, {
      creator: user2,
      queue,
    });
    await QuestionFactory.createList(10, {
      creator: user3,
      queue,
    });
    await QuestionFactory.createList(110, {
      creator: user4,
      queue,
    });
    const res = await service.computeOutput({
      insight: INSIGHTS_MAP.MostActiveStudents,
      filters: [
        {
          type: 'courseId',
          courseId: course.id,
        },
      ],
    });

    expect(res.output.dataSource).toEqual([
      {
        studentId: 4,
        name: 'Jean Valjean',
        email: 'valjean.j@protonmail.com',
        questionsAsked: '110',
      },
      {
        studentId: 2,
        name: 'David Wright',
        email: 'wright.da@northeastern.edu',
        questionsAsked: '20',
      },
      {
        studentId: 3,
        name: 'Adam Smith',
        email: 'smith.a@northeastern.edu',
        questionsAsked: '10',
      },
      {
        studentId: 1,
        name: 'Derek Jeter',
        email: 'jeter.d@northeastern.edu',
        questionsAsked: '8',
      },
    ]);
  });

  describe('toggleInsightOn', () => {
    it('works correctly', async () => {
      const userFactory = await UserFactory.create();
      const user = await UserModel.findOne(userFactory.id);
      expect(user.insights).toBeNull();
      await service.toggleInsightOn(user, 'questionTypeBreakdown');
      await user.reload();
      expect(user.insights).toStrictEqual(['questionTypeBreakdown']);
    });
  });

  describe('toggleInsightOff', () => {
    it('works correctly', async () => {
      const userFactory = await UserFactory.create({
        insights: ['averageWaitTime', 'questionTypeBreakdown'],
      });
      const user = await UserModel.findOne(userFactory.id);
      expect(user.insights).toStrictEqual([
        'averageWaitTime',
        'questionTypeBreakdown',
      ]);
      await service.toggleInsightOff(user, 'questionTypeBreakdown');
      await user.reload();
      expect(user.insights).toStrictEqual(['averageWaitTime']);
    });
  });
});
