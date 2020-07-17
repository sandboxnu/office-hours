import { CourseModule } from '../src/course/course.module';
import { CourseFactory, OfficeHourFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';

describe('Course Integraiton', () => {
  const supertest = setupIntegrationTest(CourseModule);
  describe('GET /courses/:id', () => {
    it('gets office hours and queues', async () => {
      const course = await CourseFactory.create({
        officeHours: [await OfficeHourFactory.create()],
      });
      const response = await supertest({ userId: 1 })
        .get(`/courses/${course.id}`)
        .expect(200);

      expect(response.body).toMatchSnapshot();
    });
  });
});
