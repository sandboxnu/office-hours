import { QuestionTypes, Role } from '@koh/common';
import { QuestionModel } from '../../server/src/question/question.entity';
import { SeedModule } from '../../server/src/seed/seed.module';
import {
  CourseFactory,
  QuestionFactory,
  QuestionTypeFactory,
  QueueFactory,
  UserFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { forEach } from 'async';

describe('Seed Integration', () => {
  const supertest = setupIntegrationTest(SeedModule);
  it('GET /seeds/delete', async () => {
    const course = await CourseFactory.create({});

    const queue = await QueueFactory.create({
      room: 'WHV 101',
      course: course,
    });

    await QuestionFactory.create({ queue: queue });
    await QuestionFactory.create({ queue: queue });
    await QuestionFactory.create({ queue: queue });

    const response = await supertest().get('/seeds/delete').expect(200);

    expect(response.text).toBe('Data successfully reset');
  });

  it('GET /seeds/create', async () => {
    await CourseFactory.create();
    const response = await supertest().get('/seeds/create').expect(200);

    expect(response.text).toBe('Data successfully seeded');

    const numQuestions = await QuestionModel.count();
    expect(numQuestions).toBe(4);
  });
});
