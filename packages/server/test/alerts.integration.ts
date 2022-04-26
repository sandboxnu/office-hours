import { AlertType, ERROR_MESSAGES } from '@koh/common';
import { AlertsModule } from 'alerts/alerts.module';
import {
  AlertFactory,
  CourseFactory,
  QuestionFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
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

      const ta = await TACourseFactory.create({
        user: await UserFactory.create(),
        course: course1,
      });

      const queue1 = await QueueFactory.create({
        course: course1,
        staffList: [ta.user],
      });
      const question1 = await QuestionFactory.create({
        queue: queue1,
      });

      const queue2 = await QueueFactory.create({
        course: course2,
        staffList: [ta.user],
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

  describe('POST /alerts', () => {
    it('creates a rephrase question alert, and asserts no duplicates', async () => {
      const course = await CourseFactory.create();

      const student = await UserFactory.create();
      await StudentCourseFactory.create({
        user: student,
        course,
      });

      const ta = await UserFactory.create();
      await TACourseFactory.create({
        user: ta,
        course,
      });

      const queue = await QueueFactory.create({
        course,
        staffList: [ta],
      });
      const question = await QuestionFactory.create({
        creator: student,
        queue,
      });

      const body = {
        alertType: AlertType.REPHRASE_QUESTION,
        courseId: course.id,
        payload: {
          courseId: course.id,
          questionId: question.id,
          queueId: queue.id,
        },
      };

      let res = await supertest({ userId: ta.id })
        .post(`/alerts`)
        .send({ ...body, targetUserId: student.id })
        .expect(201);

      expect(res.body).toMatchObject(body);

      res = await supertest({ userId: ta.id })
        .post(`/alerts`)
        .send({ ...body, targetUserId: student.id })
        .expect(400);

      expect(res.body.message).toStrictEqual(
        ERROR_MESSAGES.alertController.duplicateAlert,
      );

      res = await supertest({ userId: ta.id })
        .post(`/alerts`)
        .send({
          alertType: AlertType.REPHRASE_QUESTION,
          courseId: course.id,
          targetUserId: student.id,
          payload: { courseId: course.id, questionId: question.id },
        })
        .expect(400);

      expect(res.body.message).toStrictEqual(
        ERROR_MESSAGES.alertController.incorrectPayload,
      );
    });
  });
});
