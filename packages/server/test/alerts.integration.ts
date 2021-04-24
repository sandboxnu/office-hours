import { AlertsModule } from 'alerts/alerts.module';
import {
  AlertFactory,
  CourseFactory,
  QuestionFactory,
  QueueFactory,
  UserCourseFactory,
  UserFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';

describe('Alerts Integration', () => {
  const supertest = setupIntegrationTest(AlertsModule);

  describe('GET /alerts', () => {
    it('returns whatever alerts are in the db for this course and user', async () => {
      const course1 = await CourseFactory.create();
      const course2 = await CourseFactory.create();

      const queue1 = await QueueFactory.create({
        course: course1,
      });
      const question1 = await QuestionFactory.create({
        queue: queue1,
      });

      const queue2 = await QueueFactory.create({
        course: course2,
      });
      const question2 = await QuestionFactory.create({
        queue: queue2,
      });

      const user1 = await UserFactory.create();
      const user2 = await UserFactory.create();
      await UserCourseFactory.create({
        user: user1,
        course: course1,
      });

      await UserCourseFactory.create({
        user: user2,
        course: course1,
      });
      await UserCourseFactory.create({
        user: user1,
        course: course2,
      });

      const alert1 = await AlertFactory.create({
        user: user1,
        course: course1,
        payload: {
          questionId: question1.id,
          queueId: queue1.id,
          courseId: course1.id,
        },
      });

      const alert2 = await AlertFactory.create({
        user: user1,
        course: course2,
        payload: {
          questionId: question2.id,
          queueId: queue2.id,
          courseId: course2.id,
        },
      });

      let res = await supertest({ userId: user1.id })
        .get(`/alerts/${course1.id}`)
        .expect(200);

      expect(res.body.alerts).toStrictEqual([
        {
          alertType: 'rephraseQuestion',
          id: alert1.id,
          payload: {
            questionId: question1.id,
            queueId: queue1.id,
            courseId: course1.id,
          },
          sent: alert1.sent.toISOString(),
        },
      ]);

      res = await supertest({ userId: user2.id })
        .get(`/alerts/${course1.id}`)
        .expect(200);
      expect(res.body.alerts.length).toBe(0);

      res = await supertest({ userId: user1.id })
        .get(`/alerts/${course2.id}`)
        .expect(200);
      expect(res.body.alerts).toStrictEqual([
        {
          alertType: 'rephraseQuestion',
          id: alert2.id,
          payload: {
            questionId: question2.id,
            queueId: queue2.id,
            courseId: course2.id,
          },
          sent: alert2.sent.toISOString(),
        },
      ]);
    });
  });
});
