import { Test, TestingModule } from '@nestjs/testing';
import { TestTypeOrmModule } from '../../../test/util/testUtils';
import { QueueCleanService } from './queue-clean.service';
import {
  QueueFactory,
  UserFactory,
  QuestionFactory,
  ClosedOfficeHourFactory,
} from '../../../test/util/factories';
import { OpenQuestionStatus } from '@koh/common';
import { QuestionModel } from '../../question/question.entity';
import { Connection } from 'typeorm';
import { QueueModel } from 'queue/queue.entity';

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

    it('if no staff are present all questions with open status are marked as stale', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const queue = await QueueFactory.create({ officeHours: [ofs] });
      const question = await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });

      await service.cleanQueue(queue.id);
      const updatedQuestion = await QuestionModel.findOne(question.id);
      expect(updatedQuestion.status).toEqual('Stale');
    });

    it('cleaning the queue removes the queue notes', async () => {
      const ofs = await ClosedOfficeHourFactory.create();
      const queue = await QueueFactory.create({ officeHours: [ofs], notes: "This note is no longer relevant" });
      const question = await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });

      await service.cleanQueue(queue.id);
      const cleanedQueue = await QueueModel.findOne(queue.id);
      expect(cleanedQueue.notes).toBe('');
    });
  });
});
