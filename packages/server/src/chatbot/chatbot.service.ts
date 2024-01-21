import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InteractionModel } from './interaction.entity';
import { ChatbotQuestionModel } from './question.entity';
import { CourseModel } from '../course/course.entity';
import { UserModel } from '../profile/user.entity';
import {
  ChatBotQuestionParams,
  DocumentParams,
  InteractionParams,
} from '@koh/common';
import { QuestionDocumentModel } from './questionDocument.entity';
import { createQueryBuilder } from 'typeorm';
import { ChatbotDocumentModel } from './chatbotDocument.entity';

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

export interface ChatDocument {
  id: string;
  name: string;
  type: string;
  subDocumentIds: string[];
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
    cid: number,
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
      .where('q.questionText like :questionText and i.course= :cid', {
        questionText: `%${questionText}%`,
        cid: `${cid}`,
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
        sourceDocuments: question.sourceDocuments.map((sourceDocument) => ({
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
    if (!data.questionText || !data.responseText || !data.vectorStoreId) {
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
      suggested: data.suggested,
      vectorStoreId: data.vectorStoreId,
    });

    await question.save();

    if (data.sourceDocuments) {
      const questionDocuments = data.sourceDocuments.map((sourceDocument) => ({
        ...sourceDocument,
        question,
        questionId: question.id,
      }));

      const documents = QuestionDocumentModel.create(questionDocuments);
      await QuestionDocumentModel.save(documents);
    }

    return question;
  }

  async editQuestion(
    data: { userScore: number; suggested: boolean },
    questionId: number,
  ) {
    const question = await ChatbotQuestionModel.findOne(questionId);
    if (!question) {
      throw new HttpException(
        'Question not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }
    Object.assign(question, data);
    question.save();
    return question;
  }

  async deleteQuestion(questionId: number) {
    const chatQuestion = await ChatbotQuestionModel.findOne(questionId);

    if (!chatQuestion) {
      throw new HttpException(
        'Question not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await chatQuestion.remove();
  }

  async getDocuments(
    courseId: number,
    searchText: string,
    pageSize: number,
    currentPage: number,
  ): Promise<{
    chatDocuments: ChatDocument[];
    total: number;
  }> {
    const skip = pageSize * (currentPage - 1);
    const limit = pageSize;
    console.log(courseId);
    const documents = await createQueryBuilder('chatbot_document_model', 'd')
      .leftJoinAndSelect('d.course', 'c')
      .where('d.name like :searchText AND d.course=:courseId', {
        searchText: `%${searchText}%`,
        courseId: courseId,
      })
      .skip(skip)
      .take(limit)
      .orderBy('d.id', 'ASC')
      .getMany();

    const formattedDocuments: ChatDocument[] = documents.map(
      (document: any) => ({
        id: document.id,
        name: document.name,
        type: document.type,
        subDocumentIds: document.subDocumentIds,
      }),
    );

    const total = await createQueryBuilder('chatbot_document_model', 'd')
      .where('d.name like :searchText AND d.course=:courseId', {
        searchText: `%${searchText}%`,
        courseId: courseId,
      })
      .getCount();

    return {
      chatDocuments: formattedDocuments,
      total: total,
    };
  }

  async addDocument(
    data: DocumentParams,
    courseId: number,
  ): Promise<ChatbotDocumentModel> {
    if (!data.name || !data.type || !data.subDocumentIds) {
      throw new HttpException(
        'Missing question properties.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const course = await CourseModel.findOne(courseId);
    if (!course) {
      throw new HttpException(
        'Course not found based on the provided ID.',
        HttpStatus.NOT_FOUND,
      );
    }

    const document = ChatbotDocumentModel.create({
      course,
      name: data.name,
      type: data.type,
      subDocumentIds: data.subDocumentIds,
    });

    return await document.save();
  }

  async deleteDocument(documentId: number) {
    const chatbotDocument = await ChatbotDocumentModel.findOne(documentId);

    return await chatbotDocument.remove();
  }
}
