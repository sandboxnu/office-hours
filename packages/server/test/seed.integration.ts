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

  it('POST /seeds/createQuestion', async () => {
    const questionTypes = [];
    forEach(QuestionTypes, async (questionType) => {
      const currentQuestionType = await QuestionTypeFactory.create({
        name: questionType.name,
        color: questionType.color,
        cid: 1,
        id: questionType.id,
      });
      questionTypes.push(currentQuestionType);
    });
    const queue = await QueueFactory.create();
    const student = await UserFactory.create();
    const res = await supertest()
      .post('/seeds/createQuestion')
      .send({
        queueId: queue.id,
        studentId: student.id,
        data: {
          text: 'question description',
          questionTypes: questionTypes,
          groupable: false,
          queueId: queue.id,
          location: null,
          force: false,
        },
      });

    expect(res.body).toMatchObject({
      status: 'Queued',
      queueId: 1,
      text: 'question description',
      creatorId: 1,
      location: null,
      groupable: false,
      queue: {
        id: 1,
        courseId: 1,
        room: 'Online',
        notes: null,
        allowQuestions: false,
        isProfessorQueue: false,
        isDisabled: false,
      },
      creator: {
        id: 1,
        sid: null,
        email: 'user@ubc.ca',
        password: null,
        firstName: 'User',
        lastName: 'Person',
        photoURL: null,
        defaultMessage: null,
        includeDefaultMessage: true,
        accountDeactivated: false,
        desktopNotifsEnabled: false,
        phoneNotifsEnabled: false,
        userRole: 'user',
        hideInsights: [],
      },
      questionTypes: expect.arrayContaining([
        { cid: 1, name: 'Concept', color: '#000000' },
        { cid: 1, name: 'Clarification', color: '#000000' },
        { cid: 1, name: 'Setup', color: '#000000' },
        { cid: 1, name: 'Other', color: '#000000' },
        { cid: 1, name: 'Bug', color: '#000000' },
        { cid: 1, name: 'Testing', color: '#000000' },
      ]),
      taHelpedId: null,
      firstHelpedAt: null,
      helpedAt: null,
      closedAt: null,
      groupId: null,
      id: 1,
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
