import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { CourseModel } from 'course/course.entity';
import { UserModel } from 'profile/user.entity';
import { ChatBotQuestionParams, InteractionParams } from '@koh/common';
import { QuestionDocumentModel } from './questionDocument.entity';
import { createQueryBuilder, getRepository } from 'typeorm';

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

export interface ChatQuestion {
  id: string;
  question: string;
  answer: string;
  user: string;
  sourceDocuments: {
    name: string;
    type: string;
    parts: string[];
  }[];
  suggested: boolean;
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

  async getQuestions(
    questionText: string,
    pageSize: number,
    currentPage: number,
  ): Promise<{
    chatQuestions: ChatQuestion[];
    total: number;
  }> {
    const skip = pageSize * (currentPage - 1);
    const limit = pageSize;

    const questions = await createQueryBuilder('chatbot_questions_model', 'q')
      .leftJoinAndSelect('q.sourceDocuments', 's')
      .innerJoinAndSelect('q.interaction', 'i')
      .innerJoinAndSelect('i.user', 'u')
      .where('q.questionText like :questionText', {
        questionText: `%${questionText}%`,
      })
      .skip(skip)
      .take(limit)
      .orderBy('q.id', 'ASC')
      .getMany();

    const formattedQuestions: ChatQuestion[] = questions.map(
      (question: any) => ({
        id: question.id,
        question: question.questionText,
        answer: question.responseText,
        user: `${question.interaction.user.firstName} ${question.interaction.user.lastName}`,
        sourceDocuments: question.sourceDocuments.map(sourceDocument => ({
          name: sourceDocument.name,
          type: sourceDocument.type,
          parts: sourceDocument.parts,
        })),
        suggested: question.suggested,
      }),
    );

    const total = await createQueryBuilder('chatbot_questions_model', 'q')
      .where('q.questionText like :questionText', {
        questionText: `%${questionText}%`,
      })
      .getCount();

    return {
      chatQuestions: formattedQuestions,
      total: total,
    };
  }

  async createQuestion(
    data: ChatBotQuestionParams,
  ): Promise<ChatbotQuestionModel> {
    if (!data.interactionId || !data.questionText || !data.responseText) {
      throw new HttpException(
        'Missing question properties.',
        HttpStatus.BAD_REQUEST,
      );
    }

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

  async editQuestion(data: ChatBotQuestionParams, questionId: number) {
    const question = await ChatbotQuestionModel.findOne(questionId);
    if (!question) {
      throw new HttpException(
        'Question not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const chatQuestion = await ChatbotQuestionModel.createQueryBuilder()
      .update()
      .where({ id: questionId })
      .set(data)
      .callListeners(false)
      .execute();

    return chatQuestion;
  }

  async deleteQuestion(questionId: number) {
    const chatQuestion = await ChatbotQuestionModel.findOne(questionId);

    return await chatQuestion.remove();
  }
}
