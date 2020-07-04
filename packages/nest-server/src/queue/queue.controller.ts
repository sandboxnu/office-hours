import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Queue } from './queue.entity';
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
    const staffList = [
      {
        id: 54,
        name: 'Will Stenzel',
        photoURL:
          'https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=24f4b12cccbf875c7740bbfed45a993900cf0d08d11aa07c84780b3a3501f3bacca4eb33ed5effee8aa2dd195750cfbc9884dd5f2ac62c8f',
      },
      {
        id: 42,
        name: 'Grisha Zaytsev',
        photoURL:
          'https://prod-web.neu.edu/wasapp/EnterprisePhotoService/PhotoServlet?vid=CCS&er=471f2d695fbb8a00ee740ad3ea910453986aec81ddaecf889ae98b3a1858597b12650afd0d4e59c561172f76cb1946eec217ed89bd4074c0',
      },
    ];

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
