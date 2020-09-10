import { Injectable, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { QueueModel } from './queue.entity';
import {
  GetQueueResponse,
  ListQuestionsResponse,
  Role,
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

  async getQueue(queueId: number): Promise<GetQueueResponse> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });

    await queue.addQueueTimes();
    await queue.checkIsOpen();

    return queue;
  }

  async getQuestions(queueId: number): Promise<ListQuestionsResponse> {
    // todo: Make a student and a TA version of this function, and switch which one to use in the controller
    // for now, just return the student response
    const queueSize = await QueueModel.count({
      where: { id: queueId },
    });
    // Check that the queue exists
    if (queueSize === 0) {
      throw new NotFoundException();
    }
    return QuestionModel.openInQueue(queueId)
      .leftJoinAndSelect('question.creator', 'creator')
      .leftJoinAndSelect('question.taHelped', 'taHelped')
      .getMany();
  }

  /** Hide sensitive data to other students */
  anonymizeQuestions(
    questions: ListQuestionsResponse,
    userId: number,
    role: Role,
  ): ListQuestionsResponse {
    if (role === Role.STUDENT) {
      return questions.map((question) => {
        if (question.creator.id !== userId) {
          question.creator = pick(question.creator, ['id']);
        }
        return question;
      });
    }
    return questions;
  }
}
