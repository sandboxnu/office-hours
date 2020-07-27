import { Test, TestingModule } from '@nestjs/testing';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { QueueService } from './queue.service';
import {
  QueueFactory,
  UserFactory,
  QuestionFactory,
} from '../../test/util/factories';
import { OpenQuestionStatus } from '@template/common';
import { QuestionModel } from '../question/question.entity';

describe('QueueService', () => {
  let service: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [QueueService],
    }).compile();
    service = module.get<QueueService>(QueueService);
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
      const queue = await QueueFactory.create();
      const question = await QuestionFactory.create({
        status: OpenQuestionStatus.Queued,
        queue: queue,
      });

      await service.cleanQueue(queue.id);
      const updatedQuestion = await QuestionModel.findOne(question.id);
      expect(updatedQuestion.status).toEqual('Stale');
    });
  });
});
