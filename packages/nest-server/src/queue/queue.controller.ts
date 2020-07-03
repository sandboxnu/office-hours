import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Queue } from './queue.entity';
import { MOCK_GET_COURSE_RESPONSE } from '../../../server/src/mocks/getCourse';
import {
  GetQueueResponse,
  UserPartial,
  User,
  QuestionStatus,
  QuestionStatusKeys,
  Question as QuestionDTO,
  ListQuestionsResponse,
} from '@template/common';
import { Question } from '../question/question.entity';

@Controller('queues')
export class QueueController {
  constructor(private connection: Connection) {}
  @Get(':queueId')
  async getQueue(@Param('queueId') queueId: string): Promise<GetQueueResponse> {
    const queue = await Queue.findOne(queueId);

    const queueSize = await Question.count({
      where: { queueId: queue.id },
    });

    // TODO: Fill this in with real data
    const staffList = MOCK_GET_COURSE_RESPONSE.queues[0].staffList;

    return {
      id: queue.id,
      room: queue.room,
      staffList: staffList,
      queueSize: queueSize,
    };
  }

  @Get(':queueId/questions')
  async getQuestions(
    @Param('queueId') queueId: string,
  ): Promise<ListQuestionsResponse> {
    // todo: need a way to return different data, if TA vs. student hits endpoint.
    // for now, just return the student response
    const queueSize = await Queue.count({
      where: { id: queueId },
    });
    // Check that the queue exists
    if (queueSize === 0) {
      throw new NotFoundException();
    }

    const questions = await Question.find({
      where: [
        {
          queueId: queueId,
        },
      ],
      relations: ['creator', 'taHelped'],
    });

    return questions.map(questionModelToQuestion);
  }
}

function questionModelToQuestion(qm: Question): QuestionDTO {
  return {
    creator: userModelToUserPartial(qm.creator),
    id: qm.id,
    createdAt: qm.createdAt,
    status: parseStatus(qm.status),
    text: qm.text,
    // qm.taHelped: types says is nonnullable, but it is nullable
    taHelped: qm.taHelped ? userModelToUserPartial(qm.taHelped) : null,
    closedAt: qm.closedAt,
    questionType: qm.questionType,
    // TODO: helpedAt: property not required in types, but required by JOI
    helpedAt: qm.helpedAt,
  };
}

function userModelToUserPartial(um: User): UserPartial {
  return {
    id: um.id,
    name: um.name,
    // TODO: photoURL: property not required in types, but required by JOI
    photoURL: um.photoURL,
  };
}

function parseStatus(maybeStatus: string | number | symbol): QuestionStatus {
  if (maybeStatus in QuestionStatusKeys) {
    return maybeStatus as QuestionStatus;
  } else {
    throw new Error(
      `received unknown or ill-formatted status: ${String(maybeStatus)}`,
    );
  }
}
