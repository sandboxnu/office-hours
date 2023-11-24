import { ChatbotModule } from 'chatbot/chatbot.module';
import { ChatBotQuestionParams } from '@koh/common';
import {
  InteractionFactory,
  UserFactory,
  CourseFactory,
  UserCourseFactory,
} from './util/factories'; // Assuming you have these factories
import { setupIntegrationTest } from './util/testUtils';
import { ChatbotQuestionModel } from 'chatbot/question.entity';

describe('ChatbotController Integration', () => {
  const supertest = setupIntegrationTest(ChatbotModule);

  it('should create an interaction', async () => {
    const user = await UserFactory.create();
    const course = await CourseFactory.create();
    const interactionData = {
      userId: user.id,
      courseId: course.id,
    };
    await UserCourseFactory.create({
      user: user,
      course: course,
    });
    await supertest({ userId: 1 })
      .post('/chatbot/interaction')
      .send(interactionData)
      .expect(201);
  });

  it('should create a question', async () => {
    const user = await UserFactory.create();
    const course = await CourseFactory.create();
    await UserCourseFactory.create({
      user: user,
      course: course,
    });
    const interaction = await InteractionFactory.create({ user, course });

    const questionData: ChatBotQuestionParams = {
      interactionId: interaction.id,
      questionText: 'How does photosynthesis work?',
      responseText: 'Photosynthesis is the process by which plants...',
      suggested: true,
      userScore: 5,
      sourceDocuments: [
        {
          name: 'Botany Textbook',
          type: 'book',
          parts: ['Chapter 2', 'Section 3'],
        },
        {
          name: 'Scientific Article',
          type: 'article',
          parts: ['Abstract', 'Introduction'],
        },
      ],
    };

    await supertest({ userId: 1 })
      .post('/chatbot/question')
      .send(questionData)
      .expect(201);
  });

  it('should edit a question', async () => {
    const user = await UserFactory.create();
    const course = await CourseFactory.create();
    await UserCourseFactory.create({
      user: user,
      course: course,
    });
    const interaction = await InteractionFactory.create({ user, course });

    const questionData: ChatBotQuestionParams = {
      interactionId: interaction.id,
      questionText: 'How does photosynthesis work?',
      responseText: 'Photosynthesis is the process by which plants...',
      suggested: true,
      userScore: 5,
      sourceDocuments: [
        {
          name: 'Botany Textbook',
          type: 'book',
          parts: ['Chapter 2', 'Section 3'],
        },
        {
          name: 'Scientific Article',
          type: 'article',
          parts: ['Abstract', 'Introduction'],
        },
      ],
    };
    const createdQuestion =
      await ChatbotQuestionModel.create(questionData).save();
    const editRequestData = {
      data: { userScore: 0, suggested: true },
      questionId: createdQuestion.id,
    };

    await supertest({ userId: 1 })
      .patch('/chatbot/question')
      .send(editRequestData)
      .expect(200);
  });

  it('should not delete a question', async () => {
    const questionId = 1;
    const user = await UserFactory.create();
    const course = await CourseFactory.create();
    await UserCourseFactory.create({
      user: user,
      course: course,
    });
    // no questions created
    await supertest({ userId: 1 })
      .delete('/chatbot/question')
      .send({ questionId })
      .expect(404);
  });
});
