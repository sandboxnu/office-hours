import { QueueFactory, QuestionFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { QueueModule } from '../src/queue/queue.module';

describe('Queue Integration', () => {
  const supertest = setupIntegrationTest(QueueModule);

  describe('GET /queues/:id', () => {
    it('get a queue', async () => {
      const queue = await QueueFactory.create({
        questions: [await QuestionFactory.create()],
      });
      const res = await supertest().get(`/queues/${queue.id}`).expect(200);
      expect(res.body).toMatchSnapshot();
    });

    it('returns 401 when not logged in', () => {});
  });

  describe('GET /queues/:id/questions', () => {
    it('returns questions in the queue', async () => {
      const queue = await QueueFactory.create({
        questions: [await QuestionFactory.create({ text: 'in queue' })],
      });
      await QuestionFactory.create({ text: 'not in queue' });

      const res = await supertest()
        .get(`/queues/${queue.id}/questions`)
        .expect(200);
      expect(res.body).toMatchSnapshot();
    });
  });
});
