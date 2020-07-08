import { QuestionFactory, UserFactory, QueueFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { QuestionModule } from '../src/question/question.module';
import { Question } from '../src/question/question.entity';
import { QuestionType } from '@template/common';

describe('Question Integration', () => {
  const supertest = setupIntegrationTest(QuestionModule);

  describe('GET /questions/:id', () => {
    it('gets a question with the given id', async () => {
      const q = await QuestionFactory.create({ text: 'Help pls' });
      const response = await supertest().get(`/questions/${q.id}`).expect(200);
      expect(response.body).toMatchSnapshot();
    });
    it('fails to get a non-existent question', async () => {
      await supertest().get(`/questions/999`).expect(404);
    });
  });

  describe('POST /questions', () => {
    it('posts a new question', async () => {
      const queue = await QueueFactory.create();
      expect(await Question.count({ where: { queueId: 1 } })).toEqual(0);
      const response = await supertest()
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: QuestionType.Concept,
          queueId: queue.id,
        })
        .expect(201);
      expect(response.body).toMatchObject({
        text: "Don't know recursion",
        helpedAt: null,
        closedAt: null,
        questionType: 'Concept',
        status: 'Drafting',
      });
      expect(await Question.count({ where: { queueId: 1 } })).toEqual(1);
    });
    it('post question fails with non-existent queue', async () => {
      await supertest()
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: QuestionType.Concept,
          queueId: 999,
        })
        .expect(404);
    });
    // this test can be done once we figure out validation
    it.skip('post question fails with bad params', async () => {
      await supertest()
        .post('/questions')
        .send({
          question: 'I need help',
        })
        .expect(404);
    });
  });

  describe('PATCH /questions/:id', () => {
    it('updates a question', async () => {
      const q = await QuestionFactory.create({ text: 'Help pls' });

      const response = await supertest()
        .patch(`/questions/${q.id}`)
        .send({
          text: 'NEW TEXT',
        })
        .expect(200);
      expect(response.body).toMatchObject({
        id: q.id,
        text: 'NEW TEXT',
      });
      expect(await Question.findOne({ id: q.id })).toMatchObject({
        text: 'NEW TEXT',
      });
    });
    it('fails to update a non-existent question', async () => {
      await supertest()
        .patch(`/questions/999`)
        .send({
          text: 'NEW TEXT',
        })
        .expect(404);
    });
    /*
    it("PATCH question as student updates it", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });

      const user = await UserFactory.create();
      const request = await injectAsUser(getServer(), user, {
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          text: "NEW TEXT",
        },
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({ id: q.id, text: "NEW TEXT" });
      expect(await Question.findOne({ id: q.id })).toMatchObject({
        text: "NEW TEXT",
      });
    });
    it.skip("PATCH taHelped as student is not allowed", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await injectAsUser(getServer(), ta, {
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          taHelped: {
            id: ta.id,
            name: ta.name,
          },
        },
      });
      expect(request.statusCode).toEqual(401);
    });
    it.skip("PATCH status to helping as student not allowed", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });

      const request = await getServer().inject({
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          status: QuestionStatusKeys.Helping,
        },
      });
      expect(request.statusCode).toEqual(401);
    });
    it("PATCH status to helping as TA works", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await injectAsUser(getServer(), ta, {
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          status: QuestionStatusKeys.Helping,
        },
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({
        status: QuestionStatusKeys.Helping,
      });
    });
    it.skip("PATCH status to Resolved as TA works", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await getServer().inject({
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          status: QuestionStatusKeys.Resolved,
        },
      });
      expect(request.statusCode).toEqual(200);
      expect(request.result).toMatchObject({
        status: QuestionStatusKeys.Resolved,
        taHelped: ta,
      });
    });
    it.skip("PATCH anything other than status as TA not allowed", async () => {
      const q = await QuestionFactory.create({ text: "Help pls" });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const request = await getServer().inject({
        method: "patch",
        url: `/api/v1/queues/${q.queueId}/questions/${q.id}`,
        payload: {
          text: "bonjour",
        },
      });
      expect(request.statusCode).toEqual(401);
    });
    it.skip("PATCH question fails when you are not the question creator", async () => {
      // TODO
      // expect(request.statusCode).toEqual(401);
    });
    */
  });
});
