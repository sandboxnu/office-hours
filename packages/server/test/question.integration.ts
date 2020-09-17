import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  QuestionStatusKeys,
  QuestionType,
} from '@koh/common';
import { UserModel } from 'profile/user.entity';
import { QueueModel } from 'queue/queue.entity';
import supertest from 'supertest';
import { QuestionModel } from '../src/question/question.entity';
import { QuestionModule } from '../src/question/question.module';
import {
  CourseFactory,
  QuestionFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
  UserCourseFactory,
  UserFactory,
  OfficeHourFactory,
  ClosedOfficeHourFactory,
} from './util/factories';
import {
  expectUserNotified,
  modifyMockNotifs,
  setupIntegrationTest,
} from './util/testUtils';

describe('Question Integration', () => {
  const supertest = setupIntegrationTest(QuestionModule, modifyMockNotifs);

  describe('GET /questions/:id', () => {
    it('gets a question with the given id', async () => {
      const course = await CourseFactory.create();
      const q = await QuestionFactory.create({
        text: 'Help pls',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
        queue: await QueueFactory.create({
          course: course,
        }),
      });

      await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: course,
      });

      const response = await supertest({ userId: 99 })
        .get(`/questions/${q.id}`)
        .expect(200);
      expect(response.body).toMatchSnapshot();
    });
    it('fails to get a non-existent question', async () => {
      await supertest({ userId: 99 })
        .get(`/questions/999`)
        .expect(404);
    });
  });

  describe('POST /questions', () => {
    const postQuestion = (
      user: UserModel,
      queue: QueueModel,
      force = false,
    ): supertest.Test =>
      supertest({ userId: user.id })
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: QuestionType.Concept,
          queueId: queue.id,
          force,
        });

    it('posts a new question', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        course: course,
        allowQuestions: true,
      });
      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(0);
      const response = await postQuestion(user, queue).expect(201);
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
      const queue = await QueueFactory.create({
        course: course,
        allowQuestions: true,
      });
      const user = await UserFactory.create();
      await TACourseFactory.create({ user, courseId: queue.courseId });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(0);
      await postQuestion(user, queue).expect(401);
    });
    it('post question fails with non-existent queue', async () => {
      await supertest({ userId: 99 })
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: QuestionType.Concept,
          queueId: 999,
          force: false,
        })
        .expect(404);
    });
    it('does not allow posting in course student is not in', async () => {
      const queueImNotIn = await QueueFactory.create({
        allowQuestions: true,
      });
      const user = await UserFactory.create();
      await StudentCourseFactory.create({
        user,
        course: await CourseFactory.create(),
      });
      await postQuestion(user, queueImNotIn).expect(404);
    });
    it('post question fails on closed queue', async () => {
      const officeHours = await ClosedOfficeHourFactory.create();
      const course = await CourseFactory.create({
        officeHours: [officeHours],
      });

      const queue = await QueueFactory.create({
        course: course,
        officeHours: [officeHours],
        allowQuestions: true,
      });
      expect(await queue.checkIsOpen()).toBe(false);

      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      await supertest({ userId: user.id });
      await postQuestion(user, queue).expect(400);
    });
    it('post question fails with bad params', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        courseId: course.id,
        allowQuestions: true,
      });
      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      await supertest({ userId: user.id })
        .post('/questions')
        .send({
          text: 'I need help',
          questionType: 'bad param!',
          queueId: 1, // even with bad params we still need a queue
          force: false
        })
        .expect(400);
    });
    it("can't create more than one open question at a time", async () => {
      const course = await CourseFactory.create({});
      const user = await UserFactory.create();
      const queue = await QueueFactory.create({
        allowQuestions: true,
        course: course,
      });
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: queue.courseId,
      });
      await QuestionFactory.create({
        queueId: queue.id,
        creator: user,
        status: OpenQuestionStatus.Drafting,
      });

      const response = await postQuestion(user, queue);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "You can't create more than one question at a time.",
      );
    });
    it('force a question when one is already open', async () => {
      const course = await CourseFactory.create({});
      const user = await UserFactory.create();
      const queue = await QueueFactory.create({
        allowQuestions: true,
        course: course,
      });
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: queue.courseId,
      });
      await QuestionFactory.create({
        queueId: queue.id,
        creator: user,
        status: OpenQuestionStatus.Drafting,
      });

      await postQuestion(user, queue, true).expect(201);
    });
    it('lets student (who is TA in other class) create question', async () => {
      const user = await UserFactory.create();

      // Make user a TA in other class
      const queueOther = await QueueFactory.create({});
      await TACourseFactory.create({
        userId: user.id,
        courseId: queueOther.courseId,
      });

      // Make them student
      const queue = await QueueFactory.create({ allowQuestions: true });
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: queue.courseId,
      });

      await postQuestion(user, queue).expect(201);
    });
    it('works when other queues and courses exist', async () => {
      const user = await UserFactory.create();

      await QueueFactory.create({});

      // Make them student
      const queue = await QueueFactory.create({ allowQuestions: true });
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: queue.courseId,
      });

      await postQuestion(user, queue).expect(201);
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
        queue: queue,
        creator: user,
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
      const ta = await UserFactory.create();
      await TACourseFactory.create({ courseId: queue.courseId, user: ta });

      const q = await QuestionFactory.create({
        text: 'Help pls',
        status: QuestionStatusKeys.Helping,
        queue: queue,
        taHelped: ta,
      });

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
    it('PATCH invalid state transition not allowed', async () => {
      const q = await QuestionFactory.create({ text: 'Help pls' });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      const res = await supertest({ userId: ta.id })
        .patch(`/questions/${q.id}`)
        .send({
          status: ClosedQuestionStatus.StudentCancelled
        })
        .expect(401);
      expect(res.body?.message).toContain("TA cannot change status from ")
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
    it('User not in course cannot patch a question', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const user = await UserFactory.create();
      const q = await QuestionFactory.create({
        text: 'Help pls',
        queue: queue,
        creator: user,
      });

      await supertest({ userId: q.creatorId })
        .patch(`/questions/${q.id}`)
        .send({
          text: 'NEW TEXT',
        })
        .expect(404); // Don't leak that course exists
    });
    it('Tries to help more than one student', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ courseId: course.id });
      const q1 = await QuestionFactory.create({
        text: 'Help pls',
        queue: queue,
      });
      const q2 = await QuestionFactory.create({
        text: 'Help pls 2',
        queue: queue,
      });
      const ta = await UserFactory.create();
      await TACourseFactory.create({ courseId: queue.courseId, user: ta });

      await supertest({ userId: ta.id })
        .patch(`/questions/${q1.id}`)
        .send({
          status: QuestionStatusKeys.Helping,
        })
        .expect(200);
      await supertest({ userId: ta.id })
        .patch(`/questions/${q2.id}`)
        .send({
          status: QuestionStatusKeys.Helping,
        })
        .expect(400);
    });
  });
});
