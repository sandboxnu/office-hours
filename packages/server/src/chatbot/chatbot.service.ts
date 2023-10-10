import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';
import { ChatBotQuestionParams, InteractionParams } from '@koh/common';
import { QuestionDocumentModel } from './questionDocument.entity';

export interface ChatbotResponse {
  answer: string;
  sourceDocuments: {
    [key: string]: Set<string>;
  };
  similarDocuments: {
    [key: string]: Set<string>;
  };
  similarQuestions: any[]; // TODO: Find correct datatype
}

@Injectable()
export class ChatbotService {
  // Could rename 'documents' to 'resources' for more accurate wording when its not only PDFs
  // filePath currently relative

  async createInteraction(data: InteractionParams): Promise<InteractionModel> {
    const course = await CourseModel.findOne(data.courseId);
    const user = await UserModel.findOne(data.userId);

    if (!course) {
      throw new HttpException(
        'Course not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!user) {
      throw new HttpException(
        'User not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const interaction = InteractionModel.create({
      course,
      user,
      timestamp: new Date(),
    });

    return await interaction.save();
  }

  async addFeedback(questionId: number, userScore: number) {
    const question = await ChatbotQuestionModel.findOne(questionId);
    if (!question) {
      throw new HttpException(
        'Question not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await ChatbotQuestionModel.createQueryBuilder()
      .update()
      .where({ id: questionId })
      .set({ userScore: userScore })
      .callListeners(false)
      .execute();

    return result;
  }

  async createQuestion(
    data: ChatBotQuestionParams,
  ): Promise<ChatbotQuestionModel> {
    const interaction = await InteractionModel.findOne(data.interactionId);
    if (!interaction) {
      throw new HttpException(
        'Interaction not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const question = ChatbotQuestionModel.create({
      interaction,
      interactionId: data.interactionId,
      questionText: data.questionText,
      responseText: data.responseText,
    });

    await question.save();

    const questionDocuments = data.sourceDocuments.map(sourceDocument => ({
      ...sourceDocument,
      question,
      questionId: question.id,
    }));

    const documents = QuestionDocumentModel.create(questionDocuments);

    await QuestionDocumentModel.save(documents);

    return question;
  }

  // Professors/TA can only change the suggested property
  async editQuestion(data: ChatBotQuestionParams, questionId: number) {
    if (!data.suggested) {
      throw new HttpException(
        'Suggested property is required.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const chatQuestion = await ChatbotQuestionModel.createQueryBuilder()
      .update()
      .where({ id: questionId })
      .set({
        suggested: data.suggested,
      })
      .callListeners(false)
      .execute();

    return chatQuestion;
  }

  async deleteQuestion(questionId: number) {
    const chatQuestion = await ChatbotQuestionModel.findOne(questionId);

    return await chatQuestion.remove();
  }
}
