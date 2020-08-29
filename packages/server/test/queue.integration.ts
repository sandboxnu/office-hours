import {
  QueueFactory,
  QuestionFactory,
  CourseFactory,
  UserFactory,
  UserCourseFactory,
  TACourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { QueueModule } from '../src/queue/queue.module';
import { QuestionModel } from 'question/question.entity';

describe('Queue Integration', () => {
  const supertest = setupIntegrationTest(QueueModule);

  describe('GET /queues/:id', () => {
    it('get a queue', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        courseId: course.id,
        course: course,
        questions: [await QuestionFactory.create()],
      });
      const userCourse = await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: queue.course,
      });

      const res = await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}`)
        .expect(200);
      expect(res.body).toMatchObject({
        id: 2,
        notes: null,
        queueSize: 1,
        room: 'WVH 101',
        staffList: expect.any(Array),
        isOpen: true,
        startTime: expect.any(String),
        endTime: expect.any(String),
      });
    });

    it('returns 404 on non-existent course', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({ course });
      const user = await UserFactory.create();

      await supertest({ userId: user.id })
        .get(`/queues/${queue.id + 999}`)
        .expect(404);
    });

    it('returns 401 when not logged in', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        course: course,
        questions: [await QuestionFactory.create()],
      });

      const res = await supertest({ userId: 99 })
        .get(`/queues/${queue.id}`)
        .expect(401);
      expect(res.body).toMatchSnapshot();
    });

    it('returns 404 when user is not in course', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        courseId: course.id,
        course: course,
        questions: [await QuestionFactory.create()],
      });
      const userCourse = await UserCourseFactory.create({
        user: await UserFactory.create(),
      });

      await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}`)
        .expect(404);
    });
  });

  describe('GET /queues/:id/questions', () => {
    it('returns questions in the queue', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        course: course,
        questions: [
          await QuestionFactory.create({
            text: 'in queue',
            createdAt: new Date('2020-03-01T05:00:00.000Z'),
          }),
        ],
      });
      await QuestionFactory.create({
        text: 'not in queue',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
      });
      const userCourse = await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: queue.course,
        courseId: queue.course.id,
      });

      const res = await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}/questions`)
        .expect(200);
      expect(res.body).toMatchSnapshot();
      expect(res.body[0].creator).not.toHaveProperty('name');
    });

    it('student can see their own questions private data', async () => {
      const course = await CourseFactory.create();
      const userCourse = await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: course,
        courseId: course.id,
      });
      const queue = await QueueFactory.create({
        course: course,
        questions: [
          await QuestionFactory.create({
            text: 'in queue',
            createdAt: new Date('2020-03-01T05:00:00.000Z'),
            creator: userCourse.user,
            creatorId: userCourse.userId,
          }),
        ],
      });
      await QuestionFactory.create({
        text: 'not in queue',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
      });

      const res = await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}/questions`)
        .expect(200);
      expect(res.body[0].creator).toHaveProperty('name');
    });

    it('returns all creator data for ta', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        course: course,
        questions: [
          await QuestionFactory.create({
            text: 'in queue',
            createdAt: new Date('2020-03-01T05:00:00.000Z'),
          }),
        ],
      });
      await QuestionFactory.create({
        text: 'not in queue',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
      });
      const ta = await TACourseFactory.create({
        user: await UserFactory.create(),
        course: queue.course,
        courseId: queue.course.id,
      });

      const res = await supertest({ userId: ta.user.id })
        .get(`/queues/${queue.id}/questions`)
        .expect(200);
      expect(res.body[0].creator).toHaveProperty('name');
    });

    it('returns 404 when a user is not a member of the course', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        course: course,
        questions: [
          await QuestionFactory.create({
            text: 'in queue',
            createdAt: new Date('2020-03-01T05:00:00.000Z'),
          }),
        ],
      });
      await QuestionFactory.create({
        text: 'not in queue',
        createdAt: new Date('2020-03-01T05:00:00.000Z'),
      });
      const userCourse = await UserCourseFactory.create({
        user: await UserFactory.create(),
      });

      await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}/questions`)
        .expect(404);
    });
  });
});
