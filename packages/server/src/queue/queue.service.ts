import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection, In } from 'typeorm';
import { QueueModel } from './queue.entity';
import {
  ListQuestionsResponse,
  OpenQuestionStatus,
  Role,
  StatusInPriorityQueue,
  StatusInQueue,
} from '@koh/common';
import { QuestionModel } from 'question/question.entity';
import { pick } from 'lodash';

/**
 * Get data in service of the queue controller and SSE
 * WHY? To ensure data returned by endpoints is *exactly* equal to data sent by SSE
 */
@Injectable()
export class QueueService {
  constructor(private connection: Connection) {}

  async getQueue(queueId: number): Promise<QueueModel> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });
    await queue.addQueueTimes();
    await queue.checkIsOpen();
    await queue.addQueueSize();

    return queue;
  }

  async getQuestions(
    queueId: number,
    userId: number,
    role: Role,
  ): Promise<ListQuestionsResponse> {
    // todo: Make a student and a TA version of this function, and switch which one to use in the controller
    // for now, just return the student response
    const queueSize = await QueueModel.count({
      where: { id: queueId },
    });
    // Check that the queue exists
    if (queueSize === 0) {
      throw new NotFoundException();
    }

    const questions = new ListQuestionsResponse();

    questions.queue = await QuestionModel.find({
      relations: ['creator', 'taHelped'],
      where: { queueId, status: In(StatusInQueue) },
    });
    questions.questionsGettingHelp = await QuestionModel.find({
      relations: ['creator', 'taHelped'],
      where: { queueId, status: OpenQuestionStatus.Helping },
    });

    if (role === Role.STUDENT) {
      questions.yourQuestion = await QuestionModel.findOne({
        relations: ['creator', 'taHelped'],
        where: { creatorId: userId },
      });
      questions.priorityQueue = [];
    }

    if (role === Role.TA) {
      questions.priorityQueue = await QuestionModel.find({
        relations: ['creator', 'taHelped'],
        where: { queueId, status: In(StatusInPriorityQueue) },
      });
    }

    return questions;
  }

  /** Hide sensitive data to other students */
  anonymizeQuestions(
    questions: ListQuestionsResponse,
    userId: number,
    role: Role,
  ): ListQuestionsResponse {
    if (role === Role.STUDENT) {
      const newLQR = new ListQuestionsResponse();
      Object.assign(newLQR, questions);

      newLQR.queue = questions.queue.map((question) => {
        const creator =
          question.creator.id === userId
            ? question.creator
            : pick(question.creator, ['id']);
        return QuestionModel.create({ ...question, creator });
      });
      return newLQR;
    }
    return questions;
  }
}
