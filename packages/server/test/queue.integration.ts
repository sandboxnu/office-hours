import {
  QueueFactory,
  QuestionFactory,
  CourseFactory,
  UserFactory,
  UserCourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { QueueModule } from '../src/queue/queue.module';

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
        courseId: queue.course.id,
      });

      const res = await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}`)
        .expect(200);
      expect(res.body).toMatchSnapshot();
    });

    it('returns 401 when not logged in', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        courseId: course.id,
        course: course,
        questions: [await QuestionFactory.create()],
      });

      const res = await supertest({ userId: 99 })
        .get(`/queues/${queue.id}`)
        .expect(401);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET /queues/:id/questions', () => {
    it('returns questions in the queue', async () => {
      const course = await CourseFactory.create();
      const queue = await QueueFactory.create({
        course: course,
        questions: [await QuestionFactory.create({ text: 'in queue' })],
      });
      await QuestionFactory.create({ text: 'not in queue' });
      const userCourse = await UserCourseFactory.create({
        user: await UserFactory.create(),
        course: queue.course,
        courseId: queue.course.id,
      });

      const res = await supertest({ userId: userCourse.user.id })
        .get(`/queues/${queue.id}/questions`)
        .expect(200);
      expect(res.body).toMatchSnapshot();
    });
  });
});
