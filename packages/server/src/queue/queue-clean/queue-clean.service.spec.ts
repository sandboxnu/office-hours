import { OpenQuestionStatus, LimboQuestionStatus } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import moment = require('moment');
import { EventModel } from 'profile/event-model.entity';
import { QueueModel } from 'queue/queue.entity';
import { Connection } from 'typeorm';
import {
  AlertFactory,
  ClosedOfficeHourFactory,
  OfficeHourFactory,
  QuestionFactory,
  QueueFactory,
  UserFactory,
} from '../../../test/util/factories';
import { TestTypeOrmModule } from '../../../test/util/testUtils';
import { QuestionModel } from '../../question/question.entity';
import { QueueCleanService } from './queue-clean.service';

describe('QueueService', () => {
  let service: QueueCleanService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [QueueCleanService],
    }).compile();
    service = module.get<QueueCleanService>(QueueCleanService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
    jest.resetAllMocks();
  });

  describe('shouldCleanQueue', () => {
    it('returns true when no staff, 1 question, and no other office hours', async () => {
      const queue = await QueueFactory.create({ officeHours: [] });
      await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });
      expect(await service.shouldCleanQueue(queue)).toBeTruthy();
    });

    it('returns false when no staff, 1 question, but other office hours soon', async () => {
      const queue = await QueueFactory.create();
      await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });
      await OfficeHourFactory.create({
        startTime: moment().add(10, 'minutes').toDate(),
        endTime: moment().add(30, 'minutes').toDate(),
      });
      expect(await service.shouldCleanQueue(queue)).toBeFalsy();
    });
  });

  describe('cleanQueue', () => {
    it('queue remains the same if any staff are checked in', async () => {
      const ta = await UserFactory.create();
      const queue = await QueueFactory.create({ staffList: [ta] });
      await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });

      await service.cleanQueue(queue.id);

      const question = await QuestionModel.findOne({});
      expect(question.status).toEqual('Queued');
    });

    it('queue gets cleaned when force parameter is passed, even with staff present', async () => {
      const ta = await UserFactory.create();
      const queue = await QueueFactory.create({ staffList: [ta] });
      const question = await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });

      await service.cleanQueue(queue.id, true);

      await question.reload();
      expect(question.status).toEqual('Stale');
    });

    it('if no staff are present all questions with open status are marked as stale', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const queue = await QueueFactory.create({ officeHours: [ofs] });
      const question = await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });

      await service.cleanQueue(queue.id);
      await question.reload();
      expect(question.status).toEqual('Stale');
    });

    it('checkout all staff from all queues', async () => {
      const ta = await UserFactory.create();
      const ta2 = await UserFactory.create();
      const ta3 = await UserFactory.create();
      const ta4 = await UserFactory.create();

      const queue = await QueueFactory.create({
        staffList: [ta],
        officeHours: [],
      });
      const queue2 = await QueueFactory.create({
        staffList: [ta2, ta3],
        officeHours: [],
      });
      const queue3 = await QueueFactory.create({
        staffList: [ta4],
        officeHours: [
          await OfficeHourFactory.create({
            startTime: new Date(Date.now() - 1000 * 60 * 5),
            endTime: new Date(Date.now() + 1000 * 60 * 5),
          }),
        ],
      });

      await service.checkoutAllStaff();

      const updatedQueue1 = await QueueModel.findOne(queue.id, {
        relations: ['staffList'],
      });
      const updatedQueue2 = await QueueModel.findOne(queue2.id, {
        relations: ['staffList'],
      });
      const updatedQueue3 = await QueueModel.findOne(queue3.id, {
        relations: ['staffList'],
      });
      const checkoutEvents = await EventModel.createQueryBuilder().getMany();
      const checkoutEventTypes = checkoutEvents.map((em) => em.eventType);
      const checkoutQueueIds = checkoutEvents.map((event) => event.queueId);

      expect(updatedQueue1.staffList.length).toEqual(0);
      expect(updatedQueue2.staffList.length).toEqual(0);
      expect(updatedQueue3.staffList.length).toEqual(1);
      expect(checkoutEventTypes).toEqual([
        'taCheckedOutForced',
        'taCheckedOutForced',
        'taCheckedOutForced',
      ]);
      expect(checkoutQueueIds).toEqual([queue.id, queue2.id, queue2.id]);
    });

    it('if no staff are present all questions with limbo status are marked as stale', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const queue = await QueueFactory.create({ officeHours: [ofs] });
      const question = await QuestionFactory.create({
        status: LimboQuestionStatus.TADeleted,
        queue: queue,
      });

      await service.cleanQueue(queue.id);
      await question.reload();
      expect(question.status).toEqual('Stale');
    });

    it('resolves lingering alerts from a queue', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const queue = await QueueFactory.create({ officeHours: [ofs] });
      const openQuestion = await QuestionFactory.create({
        queue,
      });
      const openAlert = await AlertFactory.create({
        user: openQuestion.creator,
        course: queue.course,
        payload: {
          questionId: openQuestion.id,
          queueId: queue.id,
          courseId: queue.course.id,
        },
      });
      expect(openAlert.resolved).toBeNull();

      await service.cleanQueue(queue.id);

      await openAlert.reload();
      expect(openAlert.resolved).not.toBeNull();
    });
  });
  describe('cleanAllQueues', () => {
    it('correctly cleans queues that have questions in open or limbo state', async () => {
      const cleanQueueSpy = jest.spyOn(service, 'cleanQueue');

      const queue1 = await QueueFactory.create({
        notes: 'clean me',
        officeHours: [],
      });
      const queue2 = await QueueFactory.create({
        notes: 'I could also use a clean',
        officeHours: [],
      });
      await QuestionFactory.create({
        queue: queue1,
        status: OpenQuestionStatus.Queued,
      });
      await QuestionFactory.create({
        queue: queue2,
        status: LimboQuestionStatus.CantFind,
      });

      await service.cleanAllQueues();

      await queue1.reload();
      await queue2.reload();
      expect(cleanQueueSpy).toHaveBeenCalledTimes(2);
    });

    it('does not clean queue that has no questions in open or limbo state', async () => {
      const cleanQueueSpy = jest.spyOn(service, 'cleanQueue');

      await QueueFactory.create({ notes: 'clean me' });

      await service.cleanAllQueues();
      expect(cleanQueueSpy).toHaveBeenCalledTimes(0);
    });
  });
});
