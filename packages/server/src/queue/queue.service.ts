import {
  ListQuestionsResponse,
  OpenQuestionStatus,
  Question,
  QuestionGroup,
  Role,
  StatusInPriorityQueue,
  StatusInQueue,
  StatusSentToCreator,
} from '@koh/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { pick } from 'lodash';
import { QuestionModel } from 'question/question.entity';
import { Connection, In } from 'typeorm';
import { QueueModel } from './queue.entity';

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

    const questionsFromDb = await QuestionModel.inQueueWithStatus(queueId, [
      ...StatusInPriorityQueue,
      ...StatusInQueue,
      OpenQuestionStatus.Helping,
    ])
      .leftJoinAndSelect('question.creator', 'creator')
      .leftJoinAndSelect('question.taHelped', 'taHelped')
      .getMany();

    const groupMap: Record<number, QuestionGroup> = {};

    questionsFromDb.forEach((question) => {
      // q's with a group but not in priority queue
      if (
        question.groupId &&
        !StatusInPriorityQueue.includes(question.status as OpenQuestionStatus)
      ) {
        if (!groupMap[question.groupId]) {
          groupMap[question.groupId] = {
            id: question.groupId,
            creator: question.taHelped,
            questions: [question],
          };
        } else {
          groupMap[question.groupId].questions.push(question);
        }
      }
    });

    const questions = new ListQuestionsResponse();

    questions.queue = questionsFromDb.filter((question) =>
      StatusInQueue.includes(question.status as OpenQuestionStatus),
    );

    questions.questionsGettingHelp = questionsFromDb.filter(
      (question) =>
        question.status === OpenQuestionStatus.Helping && !question.groupId,
    );

    questions.priorityQueue = questionsFromDb.filter((question) =>
      StatusInPriorityQueue.includes(question.status as OpenQuestionStatus),
    );

    questions.groups = Object.values(groupMap);

    return questions;
  }

  /** Hide sensitive data to other students */
  async personalizeQuestions(
    queueId: number,
    questions: ListQuestionsResponse,
    userId: number,
    role: Role,
  ): Promise<ListQuestionsResponse> {
    if (role === Role.STUDENT) {
      const newLQR = new ListQuestionsResponse();
      Object.assign(newLQR, questions);

      newLQR.queue = questions.queue.map((question) => {
        const creator =
          question.creator.id === userId
            ? question.creator
            : pick(question.creator, ['id']);
        // classToClass transformer will apply the @Excludes
        return classToClass<Question>(
          QuestionModel.create({ ...question, creator }),
        );
      });

      newLQR.yourQuestion = await QuestionModel.findOne({
        relations: ['creator', 'taHelped'],
        where: {
          creatorId: userId,
          queueId: queueId,
          status: In(StatusSentToCreator),
        },
      });
      newLQR.priorityQueue = [];

      return newLQR;
    }
    return questions;
  }
}
