import {
  ClosedQuestionStatus,
  ERROR_MESSAGES,
  OpenQuestionStatus,
  QuestionStatusKeys,
  QuestionType,
  Role,
} from '@koh/common';
import { UserModel } from 'profile/user.entity';
import { QuestionGroupModel } from 'question/question-group.entity';
import { QueueModel } from 'queue/queue.entity';
import supertest from 'supertest';
import { QuestionModel } from '../src/question/question.entity';
import { QuestionModule } from '../src/question/question.module';
import {
  CourseFactory,
  QuestionFactory,
  QuestionGroupFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
  UserCourseFactory,
  UserFactory,
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
      const student1 = await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: course,
      });
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });

      const queue = await QueueFactory.create({
        staffList: [ta.user],
      });

      const q = await QuestionFactory.create({
        text: 'Help pls',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
        queue: queue,
        creator: student1.user,
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
    const postQuestion = (
      user: UserModel,
      queue: QueueModel,
      force = false,
    ): supertest.Test =>
      supertest({ userId: user.id }).post('/questions').send({
        text: "Don't know recursion",
        questionType: QuestionType.Concept,
        queueId: queue.id,
        force,
        groupable: true,
      });

    it('posts a new question', async () => {
      const course = await CourseFactory.create();
      const user = await UserFactory.create();

      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });

      const queue = await QueueFactory.create({
        course: course,
        allowQuestions: true,
        staffList: [ta.user],
      });

      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(0);
      const response = await supertest({ userId: user.id })
        .post('/questions')
        .send({
          text: "Don't know recursion",
          questionType: null,
          queueId: queue.id,
          force: false,
          groupable: true,
        })
        .expect(201);
      expect(response.body).toMatchObject({
        text: "Don't know recursion",
        helpedAt: null,
        closedAt: null,
        questionType: null,
        status: 'Drafting',
        groupable: true,
      });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(1);
    });
    it('ta cannot post  a new question', async () => {
      const course = await CourseFactory.create();
      const user = await UserFactory.create();
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });
      const queue = await QueueFactory.create({
        course: course,
        allowQuestions: true,
        staffList: [ta.user],
      });
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
          groupable: true,
        })
        .expect(404);
    });
    it('does not allow posting in course student is not in', async () => {
      const course = await CourseFactory.create();
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });

      const queueImNotIn = await QueueFactory.create({
        allowQuestions: true,
        course: course,
        staffList: [ta.user],
      });

      expect(await queueImNotIn.checkIsOpen()).toBe(true);

      const user = await UserFactory.create();
      await StudentCourseFactory.create({
        user,
        course: await CourseFactory.create(),
      });
      await postQuestion(user, queueImNotIn).expect(404);
    });

    it('post question fails on closed queue', async () => {
      const course = await CourseFactory.create({});

      const queue = await QueueFactory.create({
        course: course,
        allowQuestions: true,
      });
      // expect(await queue.checkIsOpen()).toBe(false);
      expect(await queue.checkIsOpen()).toBe(true);

      const user = await UserFactory.create();
      await StudentCourseFactory.create({ user, courseId: queue.courseId });
      await supertest({ userId: user.id });
      // await postQuestion(user, queue).expect(400);
      await postQuestion(user, queue).expect(201);
    });

    // it('post question fails with bad params', async () => {
    //   const course = await CourseFactory.create();
    //   const ta = await TACourseFactory.create({
    //     course: course,
    //     user: await UserFactory.create(),
    //   });
    //   const queue = await QueueFactory.create({
    //     courseId: course.id,
    //     allowQuestions: true,
    //     staffList: [ta.user],
    //   });

    //   const user = await UserFactory.create();
    //   await StudentCourseFactory.create({ user, courseId: queue.courseId });

    //   expect(await queue.checkIsOpen()).toBe(true);
    //   await supertest({ userId: user.id })
    //     .post('/questions')
    //     .send({
    //       text: 'I need help',
    //       questionType: 'bad param!',
    //       queueId: 1, // even with bad params we still need a queue
    //       force: false,
    //       groupable: true,
    //     })
    //     .expect(400);
    // });

    it("can't create more than one open question for the same course at a time", async () => {
      const course = await CourseFactory.create({});
      const user = await UserFactory.create();
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });
      const ta2 = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });
      const queue1 = await QueueFactory.create({
        allowQuestions: true,
        course: course,
        staffList: [ta2.user],
      });
      const queue2 = await QueueFactory.create({
        allowQuestions: true,
        course: course,
        staffList: [ta.user],
      });

      expect(await queue1.checkIsOpen()).toBe(true);
      expect(await queue2.checkIsOpen()).toBe(true);

      await StudentCourseFactory.create({
        userId: user.id,
        courseId: course.id,
      });
      await QuestionFactory.create({
        queueId: queue1.id,
        creator: user,
        queue: queue1,
        status: OpenQuestionStatus.Drafting,
      });

      const response = await postQuestion(user, queue2);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        ERROR_MESSAGES.questionController.createQuestion.oneQuestionAtATime,
      );
    });
    it('allow multiple questions across courses', async () => {
      const course1 = await CourseFactory.create({});
      const course2 = await CourseFactory.create({});
      const user = await UserFactory.create();
      const ta1 = await TACourseFactory.create({
        course: course1,
        user: await UserFactory.create(),
      });
      const ta2 = await TACourseFactory.create({
        course: course2,
        user: await UserFactory.create(),
      });
      const queue1 = await QueueFactory.create({
        allowQuestions: true,
        course: course1,
        staffList: [ta1.user],
      });
      const queue2 = await QueueFactory.create({
        allowQuestions: true,
        course: course2,
        staffList: [ta2.user],
      });
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: course1.id,
      });
      await StudentCourseFactory.create({
        userId: user.id,
        courseId: course2.id,
      });
      await QuestionFactory.create({
        queueId: queue1.id,
        creator: user,
        queue: queue1,
        status: OpenQuestionStatus.Drafting,
      });

      const response = await postQuestion(user, queue2);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        text: "Don't know recursion",
        questionType: QuestionType.Concept,
        groupable: true,
      });
      expect(await QuestionModel.count({ where: { queueId: 1 } })).toEqual(1);
      expect(await QuestionModel.count({ where: { queueId: 2 } })).toEqual(1);
    });
    it('force a question when one is already open', async () => {
      const course = await CourseFactory.create({});
      const user = await UserFactory.create();
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });

      const queue = await QueueFactory.create({
        allowQuestions: true,
        course: course,
        staffList: [ta.user],
      });

      expect(await queue.checkIsOpen()).toBe(true);

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

      const course = await CourseFactory.create();
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });
      // Make them student
      const queue = await QueueFactory.create({
        allowQuestions: true,
        staffList: [ta.user],
      });
      expect(await queue.checkIsOpen()).toBe(true);

      await StudentCourseFactory.create({
        userId: user.id,
        courseId: queue.courseId,
      });

      await postQuestion(user, queue).expect(201);
    });
    it('works when other queues and courses exist', async () => {
      const user = await UserFactory.create();

      await QueueFactory.create({});

      const course = await CourseFactory.create();
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });

      // Make them student
      const queue = await QueueFactory.create({
        staffList: [ta.user],
        allowQuestions: true,
      });
      expect(await queue.checkIsOpen()).toBe(true);

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
      const ta = await TACourseFactory.create({
        course: course,
        user: await UserFactory.create(),
      });
      const queue = await QueueFactory.create({
        staffList: [ta.user],
        courseId: course.id,
      });
      expect(await queue.checkIsOpen()).toBe(true);

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
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: course, user: ta });

      const queue = await QueueFactory.create({
        courseId: course.id,
        staffList: [ta],
      });
      expect(await queue.checkIsOpen()).toBe(true);

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
          taHelped: {
            id: ta.id,
            name: ta.name,
          },
        })
        .expect(400);
    });

    it('PATCH status to helping as student not allowed', async () => {
      const course = await CourseFactory.create();

      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: course, user: ta });
      const queue = await QueueFactory.create({
        courseId: course.id,
        staffList: [ta],
      });
      expect(await queue.checkIsOpen()).toBe(true);

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
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: course, user: ta });
      const queue = await QueueFactory.create({
        course: course,
        staffList: [ta],
      });
      expect(await queue.checkIsOpen()).toBe(true);

      const question = await QuestionFactory.create({
        text: 'Help pls',
        queue: queue,
      });

      const res = await supertest({ userId: ta.id })
        .patch(`/questions/${question.id}`)
        .send({
          status: QuestionStatusKeys.Helping,
        })
        .expect(200);
      expect(res.body).toMatchObject({
        status: QuestionStatusKeys.Helping,
        taHelped: {
          id: ta.id,
          firstName: ta.firstName,
          lastName: ta.lastName,
          photoURL: ta.photoURL,
        },
      });
      expectUserNotified(question.creatorId);
    });

    it('PATCH status to Resolved as TA works', async () => {
      const course = await CourseFactory.create();
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: course, user: ta });
      const queue = await QueueFactory.create({
        course: course,
        staffList: [ta],
      });
      expect(await queue.checkIsOpen()).toBe(true);

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
      const course = await CourseFactory.create();
      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: course, user: ta });

      const q = await QuestionFactory.create({
        text: 'Help pls',
        queue: await QueueFactory.create({ course: course, staffList: [ta] }),
      });

      expect(await q.queue.checkIsOpen()).toBe(true);

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

      q.queue.staffList.push(ta);
      expect(await q.queue.checkIsOpen()).toBe(true);

      const res = await supertest({ userId: ta.id })
        .patch(`/questions/${q.id}`)
        .send({
          status: ClosedQuestionStatus.ConfirmedDeleted,
        })
        .expect(401);
      expect(res.body?.message).toContain('TA cannot change status from ');
    });
    it('PATCH question fails when you are not the question creator', async () => {
      const q = await QuestionFactory.create({ text: 'Help pls' });

      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        course: q.queue.course,
        user: student,
      });

      const res = await supertest({ userId: student.id })
        .patch(`/questions/${q.id}`)
        .send({
          text: 'bonjour',
        })
        .expect(401);

      expect(res.body?.message).toBe(
        'Logged-in user does not have edit access',
      );
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
      queue.staffList.push(ta);
      expect(await queue.checkIsOpen()).toBe(true);

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

  describe('POST /group', () => {
    it('creates a new group and marks questions as helping', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course: course });

      const q1 = await QuestionFactory.create({ queue });
      const q2 = await QuestionFactory.create({ queue });
      const q3 = await QuestionFactory.create({ queue });
      const ta = await UserFactory.create();
      const usercourse = await TACourseFactory.create({
        courseId: queue.courseId,
        user: ta,
      });

      expect(await QuestionModel.count({ where: { groupId: 1 } })).toEqual(0);
      expect(await QuestionGroupModel.count()).toEqual(0);

      await supertest({ userId: ta.id })
        .post(`/questions/group`)
        .send({
          questionIds: [q1.id, q2.id],
          queueId: queue.id,
        })
        .expect(201);

      const newGroup = await QuestionGroupModel.findOne({
        where: { creatorId: usercourse.id },
        relations: ['questions'],
      });
      expect(newGroup).toBeDefined();
      expect(newGroup.questions.length).toEqual(2);
      expect(newGroup.questions.find((q) => q.id === q1.id)).toBeTruthy();
      expect(newGroup.questions.find((q) => q.id === q2.id)).toBeTruthy();
      expect(await QuestionModel.findOne({ id: q3.id })).toMatchObject({
        groupId: null,
        status: QuestionStatusKeys.Queued,
      });
      expect(await QuestionModel.findOne({ id: q1.id })).toMatchObject({
        groupId: newGroup.id,
        status: QuestionStatusKeys.Helping,
      });
      expect(await QuestionModel.findOne({ id: q2.id })).toMatchObject({
        groupId: newGroup.id,
        status: QuestionStatusKeys.Helping,
      });
    });
    it('student cannot create group', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course: course });

      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        user: student,
        courseId: queue.courseId,
      });

      const q = await QuestionFactory.create({
        creator: student,
        queue: queue,
      });

      const ta = await UserFactory.create();
      await TACourseFactory.create({ course: q.queue.course, user: ta });

      await supertest({ userId: q.creatorId })
        .post(`/questions/group`)
        .send({
          questionIds: [q.id],
          queueId: queue.id,
        })
        .expect(401);
    });
    it('disallows grouping questions that have groupable as false', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course: course });

      const q1 = await QuestionFactory.create({ queue });
      const q2 = await QuestionFactory.create({ queue, groupable: false });
      const ta = await UserFactory.create();
      await TACourseFactory.create({
        courseId: queue.courseId,
        user: ta,
      });
      queue.staffList.push(ta);
      expect(await queue.checkIsOpen()).toBe(true);

      await supertest({ userId: ta.id })
        .post(`/questions/group`)
        .send({
          questionIds: [q1.id, q2.id],
          queueId: queue.id,
        })
        .expect(400);
    });
  });

  describe('PATCH /resolveGroup/:group_id', () => {
    it('marks questions in a group (that are not priority queued) as resolved', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course });
      const ta = await UserFactory.create({
        firstName: 'TSM',
        lastName: 'Ninja',
      });
      const ucm = await UserCourseFactory.create({
        course: queue.course,
        user: ta,
        role: Role.TA,
      });

      const group1 = await QuestionGroupFactory.create({
        queue,
        creator: ucm,
      });
      const g1q1 = await QuestionFactory.create({
        queue,
        groupable: true,
        group: group1,
        status: QuestionStatusKeys.Helping,
        taHelped: ta,
      });
      const g1q2 = await QuestionFactory.create({
        queue,
        groupable: true,
        group: group1,
        status: QuestionStatusKeys.Helping,
        taHelped: ta,
      });
      const g1q3 = await QuestionFactory.create({
        queue,
        groupable: true,
        group: group1,
        status: QuestionStatusKeys.PriorityQueued,
        taHelped: ta,
      });

      await supertest({ userId: ta.id })
        .patch(`/questions/resolveGroup/${group1.id}`)
        .send({ queueId: queue.id })
        .expect(200);

      expect(await QuestionModel.findOne({ id: g1q3.id })).toMatchObject({
        groupId: group1.id,
        status: QuestionStatusKeys.PriorityQueued,
      });
      expect(await QuestionModel.findOne({ id: g1q1.id })).toMatchObject({
        groupId: group1.id,
        status: QuestionStatusKeys.Resolved,
      });
      expect(await QuestionModel.findOne({ id: g1q2.id })).toMatchObject({
        groupId: group1.id,
        status: QuestionStatusKeys.Resolved,
      });
    });
  });
});
