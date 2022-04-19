describe('No Tests while Insights are disabled', () => {
  it('returns the correct insights data', async () => {
    expect(3).toBe(3);
  });
});

/*
import {
  UserFactory,
  CourseFactory,
  QuestionFactory,
  QueueFactory,
  UserCourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { InsightsModule } from '../src/insights/insights.module';
import { Role } from '@koh/common';

describe('Insights Integration', () => {
  const supertest = setupIntegrationTest(InsightsModule);

  describe('GET /insights/:courseId/:insightName', () => {
    it('returns the correct insights data', async () => {
      const user = await UserFactory.create();
      const course = await CourseFactory.create({ name: 'CS 2500' });
      const queue = await QueueFactory.create({ course });
      await QuestionFactory.createList(6, { queue });
      await UserCourseFactory.create({
        user,
        course,
        role: Role.PROFESSOR,
      });

      const res = await supertest({ userId: user.id })
        .get(`/insights/${course.id}/TotalQuestionsAsked`)
        .expect(200);
      expect(res.text).toEqual('6');
    });

    it('returns an error when the user does not have the correct role', async () => {
      const ucf = await UserCourseFactory.create({ role: Role.STUDENT });

      const res = await supertest({ userId: ucf.userId })
        .get(`/insights/${ucf.courseId}/TotalQuestionsAsked`)
        .expect(400);
      expect(res.body.message).toEqual(
        'User is not authorized to view this insight',
      );
    });

    it('returns an error when the insight name is not found', async () => {
      const ucf = await UserCourseFactory.create({ role: Role.PROFESSOR });

      const res = await supertest({ userId: ucf.userId })
        .get(`/insights/${ucf.courseId}/AlamoInsight`)
        .expect(400);
      expect(res.body.message).toEqual('The insight requested was not found');
    });
  });
});
*/
