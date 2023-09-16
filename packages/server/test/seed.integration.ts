import { Role } from '@koh/common';
import { QuestionModel } from '../../server/src/question/question.entity';
import { SeedModule } from '../../server/src/seed/seed.module';
import { CourseFactory, QuestionFactory, QueueFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';

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

  it('GET /seeds/createUser', async () => {
    const res = await supertest()
      .post('/seeds/createUser')
      .send({ role: Role.TA });
    expect(res.body).toMatchObject({
      courseId: 1,
      id: 1,
      role: 'ta',
      user: {
        defaultMessage: null,
        desktopNotifsEnabled: false,
        email: 'user@ubc.ca',
        id: 1,
        includeDefaultMessage: true,
        phoneNotifsEnabled: false,
        photoURL: null,
      },
      userId: 1,
    });
  });

  it('GET /seeds/createQueue', async () => {
    await CourseFactory.create({ name: 'CS 1800' });
    const res = await supertest()
      .post('/seeds/createQueue')
      .send({ courseId: 1 });
    expect(res.body).toMatchObject({
      courseId: 1,
      id: 1,
      notes: null,
      room: 'Online',
    });
  });

  it('GET /seeds/createQuestion', async () => {
    const res = await supertest().post('/seeds/createQuestion');
    expect(res.body).toMatchObject({
      closedAt: null,
      creatorId: 1,
      helpedAt: null,
      id: 1,
      location: null,
      questionType: 'Other',
      queueId: 1,
      status: 'Queued',
      taHelpedId: null,
      text: 'question description',
    });
  });

  it('POST /seeds/createQueueWithoutOfficeHour', async () => {
    await CourseFactory.create({ name: 'CS 2500 ' });
    const res = await supertest()
      .post('/seeds/createQueueWithoutOfficeHour')
      .send({ courseId: 1 });
    expect(res.body).toMatchObject({
      courseId: 1,
      id: 1,
      notes: null,
      room: 'Online',
    });
  });
});
