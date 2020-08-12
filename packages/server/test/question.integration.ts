import {
  OpenQuestionStatus,
  QuestionStatusKeys,
  QuestionType,
} from '@template/common';
import { QuestionModel } from '../src/question/question.entity';
import { QuestionModule } from '../src/question/question.module';
import {
  QuestionFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
  UserFactory,
  CourseFactory,
  UserCourseFactory,
} from './util/factories';
import { QueueModel } from '../src/queue/queue.entity';
import {
  setupIntegrationTest,
  modifyMockNotifs,
  expectUserNotified,
} from './util/testUtils';

describe('Question Integration', () => {
  const supertest = setupIntegrationTest(QuestionModule, modifyMockNotifs);

  describe('GET /questions/:id', () => {
    it('gets a question with the given id', async () => {
      const course = await CourseFactory.create();
      const q = await QuestionFactory.create({
        text: 'Help pls',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
        queue: await QueueModel.create({
          course: course,
          courseId: course.id,
        }),
      });

      await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: q.queue.course,
      });

      const response = await supertest({ userId: 99 })
        .get(`/questions/${q.id}`)
        .expect(200);
      expect(response.body).toMatchSnapshot();
    });
    it('fails to get a non-existent question', async () => {
      await supertest({ userId: 99 }).get(`/questions/999`).expect(404);
    });
  });

  describe('POST /questions', () => {
    it('posts a new question', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(0);
      const response = await supertest({ userId: user.id })
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
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(1);
    });
    it('ta cannot post  a new question', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const user = await UserFactory.create();
      await TACourseFactory.create({ user, courseId: queue.courseId });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(0);
      await supertest({ userId: user.id })
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: QuestionType.Concept,
          queueId: queue.id,
        })
        .expect(401);
    });
    it('post question fails with non-existent queue', async () => {
      await supertest({ userId: 99 })
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: QuestionType.Concept,
          queueId: 999,
        })
        .expect(404);
    });
    it('post question fails with bad params', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      await supertest({ userId: user.id })
        .post('/questions')
        .send({
          text: 'I need help',
          questionType: 'bad param!',
          queueId: 1, // even with bad params we still need a queue
        })
        .expect(400);
    });
    it("can't create more than one open question at a time", async () => {
      const user = await UserFactory.create();
      const queue = await QueueFactory.create();
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: queue.courseId,
      });
      await QuestionFactory.create({
        queueId: queue.id,
        creator: user,
        status: OpenQuestionStatus.Drafting,
      });

      const response = await supertest({ userId: user.id })
        .post('/questions')
        .send({
          text: 'i need to know where the alamo is',
          queueId: queue.id,
          questionType: QuestionType.Bug,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You can't create more than one question fuck ligma stanley",
      );
    });
  });

  describe('PATCH /questions/:id', () => {
    it('as student creator, edit a question', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      const q = await QuestionFactory.create({
        text: 'Help pls',
        queueId: queue.id,
        queue: queue,
        creator: user,
        creatorId: user.id,
      });

      const response = await supertest({ userId: q.creatorId })
        .patch(`/questions/${q.id}`)
        .send({
          text: 'NEW TEXT',
        })
        .expect(200);
      expect(response.body).toMatchObject({
        id: q.id,
        text: 'NEW TEXT',
      });
      expect(await QuestionModel.findOne({ id: q.id })).toMatchObject({
        text: 'NEW TEXT',
      });
    });
    it('fails to update a non-existent question', async () => {
      await supertest({ userId: 99 })
        .patch(`/questions/999`)
        .send({
          text: 'NEW TEXT',
        })
        .expect(404);
    });
    it('PATCH taHelped as student is not allowed', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        user: student,
        courseId: queue.courseId,
      });

      const q = await QuestionFactory.create({
        text: 'Help pls',
        queueId: queue.id,
        creatorId: student.id,
        creator: student,
        queue: queue,
      });

      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      await supertest({ userId: q.creatorId })
        .patch(`/questions/${q.id}`)
        .send({
          taHelped: {
            id: ta.id,
            name: ta.name,
          },
        })
        .expect(400);
    });
    it('PATCH status to helping as student not allowed', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        user: student,
        courseId: queue.courseId,
      });
      const q = await QuestionFactory.create({
        text: 'Help pls',
        queueId: queue.id,
        creatorId: student.id,
        creator: student,
        queue: queue,
      });

      await supertest({ userId: q.creatorId })
        .patch(`/questions/${q.id}`)
        .send({
          status: QuestionStatusKeys.Helping,
        })
        .expect(401);
    });
    it('PATCH status to helping as TA works', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const q = await QuestionFactory.create({
        text: 'Help pls',
        queueId: queue.id,
        queue: queue,
      });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ courseId: queue.courseId, user: ta });

      const res = await supertest({ userId: ta.id })
        .patch(`/questions/${q.id}`)
        .send({
          status: QuestionStatusKeys.Helping,
        })
        .expect(200);
      expect(res.body).toMatchObject({
        status: QuestionStatusKeys.Helping,
        taHelped: { id: ta.id, name: ta.name, photoURL: ta.photoURL },
      });
      expectUserNotified(q.creatorId);
    });
    it('PATCH status to Resolved as TA works', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const q = await QuestionFactory.create({
        text: 'Help pls',
        status: QuestionStatusKeys.Queued,
        queueId: queue.id,
        queue: queue,
      });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ courseId: queue.courseId, user: ta });

      const res = await supertest({ userId: ta.id })
        .patch(`/questions/${q.id}`)
        .send({
          status: QuestionStatusKeys.Resolved,
        })
        .expect(200);
      expect(res.body).toMatchObject({
        status: QuestionStatusKeys.Resolved,
      });
    });
    it('PATCH anything other than status as TA not allowed', async () => {
      const q = await QuestionFactory.create({ text: 'Help pls' });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      await supertest({ userId: ta.id })
        .patch(`/questions/${q.id}`)
        .send({
          text: 'bonjour',
        })
        .expect(401);
    });
    it('PATCH question fails when you are not the question creator', async () => {
      const q = await QuestionFactory.create({ text: 'Help pls' });
      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        course: q.queue.course,
        user: student,
      });

      await supertest({ userId: student.id })
        .patch(`/questions/${q.id}`)
        .send({
          text: 'bonjour',
        })
        .expect(401);
    });
    it('nonuser cannot patch a question', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const user = await UserFactory.create();
      const q = await QuestionFactory.create({
        text: 'Help pls',
        queueId: queue.id,
        queue: queue,
        creator: user,
        creatorId: user.id,
      });

      await supertest({ userId: q.creatorId })
        .patch(`/questions/${q.id}`)
        .send({
          text: 'NEW TEXT',
        })
        .expect(401);
    });
  });
});
