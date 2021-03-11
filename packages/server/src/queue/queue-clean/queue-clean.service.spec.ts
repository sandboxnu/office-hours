import { OpenQuestionStatus, LimboQuestionStatus } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import moment = require('moment');
import { EventModel } from 'profile/event-model.entity';
import { QueueModel } from 'queue/queue.entity';
import { Connection } from 'typeorm';
import {
  ClosedOfficeHourFactory,
  CourseFactory,
  CourseSectionFactory,
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
      const checkoutEvents = (
        await EventModel.createQueryBuilder().getMany()
      ).map((em) => em.eventType);

      expect(updatedQueue1.staffList.length).toEqual(0);
      expect(updatedQueue2.staffList.length).toEqual(0);
      expect(updatedQueue3.staffList.length).toEqual(1);
      expect(checkoutEvents).toEqual([
        'taCheckedOutForced',
        'taCheckedOutForced',
        'taCheckedOutForced',
      ]);
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

    it('cleaning the queue removes the queue notes', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const queue = await QueueFactory.create({
        officeHours: [ofs],
        notes: 'This note is no longer relevant',
      });

      await service.cleanQueue(queue.id);
      await queue.reload();
      expect(queue.notes).toBe('');
    });
  });
  describe('cleanAllQueues', () => {
    it('correctly cleans queues from current course sections', async () => {
      const cleanQueueSpy = jest.spyOn(service, 'cleanQueue');

      const queue1 = await QueueFactory.create({ notes: 'clean me', officeHours: [] });
      const queue2 = await QueueFactory.create({ notes: 'I could also use a clean', officeHours: [] });
      const course = await CourseFactory.create({ queues: [queue1, queue2] });
      await CourseSectionFactory.create({ course });

      await service.cleanAllQueues();

      await queue1.reload();
      await queue2.reload();
      expect(queue1.notes).toEqual('');
      expect(queue2.notes).toEqual('');

      expect(cleanQueueSpy).toHaveBeenCalledTimes(2);
    });

    it('does not clean queues that are not related to current course section', async () => {
      const cleanQueueSpy = jest.spyOn(service, 'cleanQueue');

      await QueueFactory.create({ notes: 'clean me'});

      await service.cleanAllQueues();
      expect(cleanQueueSpy).toHaveBeenCalledTimes(0);
    });
  });
});
