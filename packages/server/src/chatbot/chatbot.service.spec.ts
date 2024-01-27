import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { ChatbotService } from './chatbot.service';
import { TestConfigModule, TestTypeOrmModule } from '../../test/util/testUtils';
import {
  UserFactory,
  CourseFactory,
  InteractionFactory,
} from '../../test/util/factories'; // Assuming you have factories for these
import { ChatBotQuestionParams } from '@koh/common';
import { QuestionDocumentModel } from './questionDocument.entity';

describe('ChatbotService', () => {
  let service: ChatbotService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [ChatbotService],
    }).compile();

    service = module.get<ChatbotService>(ChatbotService);
    conn = module.get<Connection>(Connection);
  });
  describe('createInteraction', () => {
    it('should throw an error if course is not found', async () => {
      await expect(
        service.createInteraction({ courseId: 0, userId: 1 }),
      ).rejects.toThrow('Course not found based on the provided ID.');
    });

    it('should create an interaction', async () => {
      const user = await UserFactory.create();
      const course = await CourseFactory.create();
      const interaction = await InteractionFactory.create({
        user: user,
        course: course,
      });

      expect(interaction).toBeDefined();
      expect(interaction.user).toEqual(user);
      expect(interaction.course).toEqual(course);
    });
  });
  describe('createQuestion', () => {
    it('should throw an error if required properties are missing', async () => {
      const incompleteParams: ChatBotQuestionParams = {
        interactionId: 1, // assuming an interaction with this ID exists
        // missing questionText and responseText
      };

      await expect(service.createQuestion(incompleteParams)).rejects.toThrow(
        'Missing question properties.',
      );
    });
    it('should create a question with valid properties', async () => {
      const interaction = await InteractionFactory.create();
      const questionParams: ChatBotQuestionParams = {
        interactionId: interaction.id,
        questionText: "What's the meaning of life?",
        responseText: "It's a philosophical question.",
        suggested: true,
        userScore: 5,
        vectorStoreId: '1',
        sourceDocuments: [
          {
            name: 'Document1',
            type: 'PDF',
            parts: ['p1', 'p2'],
          },
        ],
      };
      const createdQuestion = await service.createQuestion(questionParams);
      expect(createdQuestion).toBeDefined();
      expect(createdQuestion.questionText).toEqual(questionParams.questionText);
      expect(createdQuestion.responseText).toEqual(questionParams.responseText);
    });
    it('should create associated source documents with the question', async () => {
      const interaction = await InteractionFactory.create();
      const questionParams: ChatBotQuestionParams = {
        interactionId: interaction.id,
        questionText: "What's the meaning of life?",
        responseText: "It's a philosophical question.",
        suggested: true,
        userScore: 5,
        vectorStoreId: '1',
        sourceDocuments: [
          {
            name: 'Document1',
            type: 'PDF',
            parts: ['p1', 'p2'],
          },
        ],
      };

      const createdQuestion = await service.createQuestion(questionParams);
      const associatedDocuments = await QuestionDocumentModel.find({
        where: { question: createdQuestion },
      });

      expect(associatedDocuments).toHaveLength(1);
      expect(associatedDocuments[0].name).toEqual('Document1');
    });
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });
});
