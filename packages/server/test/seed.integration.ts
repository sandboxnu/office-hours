import { CourseModule } from '../src/course/course.module';
import { QueueModel } from '../src/queue/queue.entity';
import {
  OfficeHourFactory,
  QueueFactory,
  StudentCourseFactory,
  TACourseFactory,
  UserFactory,
  QuestionFactory,
  CourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { SeedModule } from '../../server/src/seed/seed.module';
import { CourseModel } from '../../server/src/course/course.entity';
import { QuestionModel } from '../../server/src/question/question.entity';

describe('Seed Integration', () => {
  const supertest = setupIntegrationTest(SeedModule);
  it('GET /seeds/delete', async () => {
    const now = new Date();
    const course = await CourseFactory.create({
        officeHours: [await OfficeHourFactory.create()],
      });

    const queue = await QueueFactory.create({
        room: "WHV 101",
        course: course,
        officeHours: [
          await OfficeHourFactory.create({
            startTime: now,
            endTime: new Date(now.valueOf() + 4500000),
          }),
        ],
      });
    
    await QuestionFactory.create({ queue: queue });
    await QuestionFactory.create({ queue: queue });
    await QuestionFactory.create({ queue: queue });

    const response = await supertest()
        .get('/seeds/delete')
        .expect(200);

    expect(response.text).toBe('Data successfully reset');
  });

  it('GET /seeds/create', async () => {
    const response = await supertest()
    .get('/seeds/create')
    .expect(200);

    expect(response.text).toBe('Data successfully seeded');

    const numQuestions = await QuestionModel.count();
    expect(numQuestions).toBe(3);

});

});
