import { ListQuestionsResponse, QuestionStatusKeys, Role } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mapValues, zip } from 'lodash';
import { QuestionModel } from 'question/question.entity';
import { Connection } from 'typeorm';
import {
  QuestionFactory,
  QuestionGroupFactory,
  QueueFactory,
  UserFactory,
} from '../../test/util/factories';
import { TestConfigModule, TestTypeOrmModule } from '../../test/util/testUtils';
import { QueueModel } from './queue.entity';
import { QueueService } from './queue.service';
import { AlertsService } from '../alerts/alerts.service';

describe('QueueService', () => {
  let service: QueueService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [QueueService, AlertsService],
    }).compile();

    service = module.get<QueueService>(QueueService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  // create 1 question for each status that exists, and put them all in a queue
  async function createQuestionsEveryStatus(
    queue: QueueModel,
  ): Promise<QuestionModel[]> {
    const allStatuses = Object.values(QuestionStatusKeys);
    const questions = await QuestionFactory.createList(allStatuses.length, {
      queue,
    });
    for (const [status, question] of zip(allStatuses, questions)) {
      question.status = status;
    }
    await QuestionModel.save(questions);
    return questions;
  }

  describe('getQuestions', () => {
    it('only returns questions in the given queue', async () => {
      const queue = await QueueFactory.create();
      await QuestionFactory.create();
      await QuestionFactory.create({ queue });
      expect((await service.getQuestions(queue.id)).queue.length).toEqual(1);
    });

    it('filters questions by status appropriately', async () => {
      const queue = await QueueFactory.create();
      await createQuestionsEveryStatus(queue);

      const questionResponse = await service.getQuestions(queue.id);
      const statuses = mapValues(
        questionResponse,
        (questions: QuestionModel[]) => questions.map((q) => q.status),
      );
      expect(statuses).toEqual({
        priorityQueue: ['PriorityQueued'],
        questionsGettingHelp: ['Helping'],
        queue: ['Queued', 'Drafting'],
        groups: [],
        unresolvedAlerts: [],
      });
    });

    it('sorts queue questions by createdat', async () => {
      const queue = await QueueFactory.create();
      const questionIds = [];
      for (let i = 0; i < 3; i++) {
        const question = await QuestionFactory.create({
          queue,
          createdAt: new Date(Date.now() + i * 1000),
        });
        questionIds.push(question.id);
      }

      expect(
        (await service.getQuestions(queue.id)).queue.map((q) => q.id),
      ).toEqual(questionIds);
    });

    it('sorts priority queue questions by createdat', async () => {
      const queue = await QueueFactory.create();
      const questionIds = [];
      for (let i = 0; i < 3; i++) {
        const question = await QuestionFactory.create({
          queue,
          status: 'PriorityQueued',
          createdAt: new Date(Date.now() + i * 1000),
        });
        questionIds.push(question.id);
      }

      expect(
        (await service.getQuestions(queue.id)).priorityQueue.map((q) => q.id),
      ).toEqual(questionIds);
    });

    it('fetches questions in all groups', async () => {
      const queue = await QueueFactory.create();
      await createQuestionsEveryStatus(queue);
      const group1 = await QuestionGroupFactory.create({ queue });
      const g1q1 = await QuestionFactory.create({
        queue,
        groupable: true,
        group: group1,
      });
      const g1q2 = await QuestionFactory.create({
        queue,
        groupable: true,
        group: group1,
      });
      const group2 = await QuestionGroupFactory.create({ queue });
      const g2q1 = await QuestionFactory.create({
        queue,
        groupable: true,
        group: group2,
      });

      const recievedGroups = (await service.getQuestions(queue.id)).groups;

      expect(recievedGroups.length).toEqual(2);
      recievedGroups.forEach((group) => {
        if (group.id === group1.id) {
          expect(group.questions.length).toEqual(2);
          expect(group.questions.some((q) => q.id === g1q1.id)).toBeTruthy();
          expect(group.questions.some((q) => q.id === g1q2.id)).toBeTruthy();
        } else {
          expect(group.questions.length).toEqual(1);
          expect(group.questions.some((q) => q.id === g2q1.id)).toBeTruthy();
        }
      });
    });
  });

  describe('personalizeQuestions', () => {
    let queue;
    beforeEach(async () => {
      queue = await QueueFactory.create();
    });
    const personalize = (
      lqr: ListQuestionsResponse,
      userId: number,
      role: Role,
    ) => service.personalizeQuestions(queue.id, lqr, userId, role);

    it('does nothing if not a student', async () => {
      const user = await UserFactory.create();
      await QuestionFactory.create({
        queue,
        createdAt: new Date('2020-11-02T12:00:00.000Z'),
      });
      const lqr = await service.getQuestions(queue.id);
      expect(
        await service.personalizeQuestions(queue.id, lqr, user.id, Role.TA),
      ).toEqual(lqr);
    });

    it('adds yourQuestion for students with question in the queue', async () => {
      const user = await UserFactory.create();
      // Create a question but not in this queue
      await QuestionFactory.create({ creator: user });

      const blank: ListQuestionsResponse = {
        queue: [],
        priorityQueue: [],
        questionsGettingHelp: [],
        groups: [],
      };
      let lqr = await personalize(blank, user.id, Role.STUDENT);
      expect(lqr.yourQuestion).toEqual(undefined);

      // Create a question in this queue
      const question = await QuestionFactory.create({
        creator: user,
        queue,
      });
      lqr = await personalize(blank, user.id, Role.STUDENT);
      expect(lqr.yourQuestion.id).toEqual(question.id);
    });

    it('hides details of other students', async () => {
      const ours = await QuestionFactory.create({
        queue,
        createdAt: new Date('2020-11-02T12:00:00.000Z'),
        text: 'help us',
      });
      await QuestionFactory.create({
        queue,
        createdAt: new Date('2020-11-02T12:00:00.000Z'),
        text: 'help someone else',
      });

      const lqr = await personalize(
        await service.getQuestions(queue.id),
        ours.creatorId,
        Role.STUDENT,
      );
      expect(lqr).toMatchSnapshot();
    });
  });
});
