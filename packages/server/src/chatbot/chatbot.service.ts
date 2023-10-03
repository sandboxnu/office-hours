import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';
import {
  ChatBotQuestionParams,
  Interaction,
  InteractionParams,
} from '@koh/common';
import { QuestionModel } from 'question/question.entity';
import { PredeterminedQuestionModel } from './predeterminedQuestion.entity';

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
      timestamp: new Date(),
    });

    return await question.save();
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

  // TODO: Decide if predetermined questions are subject to the similarity search (Inserted into the vertorDB)
  async createPredeterminedQuestion(data: {
    question: string;
    answer: string;
  }) {
    const predeterminedQuestion = PredeterminedQuestionModel.create({
      question: data.question,
      answer: data.answer,
    });

    return await predeterminedQuestion.save();
  }

  async editPredeterminedQuestion(data: {
    predeterminedQuestionId: number;
    question: string;
    answer: string;
  }) {
    const predeterminedQuestion = await PredeterminedQuestionModel.createQueryBuilder()
      .update()
      .where({ id: data.predeterminedQuestionId })
      .set({ question: data.question, answer: data.answer })
      .callListeners(false)
      .execute();

    return predeterminedQuestion;
  }

  async deletePredeterminedQuestion(data: { predeterminedQuestionId: number }) {
    const predeterminedQuestion = await PredeterminedQuestionModel.findOne(
      data.predeterminedQuestionId,
    );

    return await predeterminedQuestion.remove();
  }
}
