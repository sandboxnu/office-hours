import { OpenQuestionStatus, LimboQuestionStatus } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import {
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

    it('if no staff are present all questions with limbo status are marked as stale', async () => {
      const queue = await QueueFactory.create({});
      const question = await QuestionFactory.create({
        status: LimboQuestionStatus.TADeleted,
        queue: queue,
      });

      await service.cleanQueue(queue.id);
      await question.reload();
      expect(question.status).toEqual('Stale');
    });
  });
  describe('cleanAllQueues', () => {
    it('correctly cleans queues that have questions in open or limbo state', async () => {
      const cleanQueueSpy = jest.spyOn(service, 'cleanQueue');

      const queue1 = await QueueFactory.create({
        notes: 'clean me',
      });
      const queue2 = await QueueFactory.create({
        notes: 'I could also use a clean',
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
