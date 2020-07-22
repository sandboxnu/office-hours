import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { QueueModel } from './queue.entity';
import { OpenQuestionStatus } from '@template/common';
import { QuestionModel } from '../question/question.entity';

@Injectable()
export class QueueService {
  constructor(private connection: Connection) {}

  @Cron(CronExpression.EVERY_HOUR)
  public async cleanQueue(queueId: number): Promise<void> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList', 'questions'],
    });
    // If no staff are present, clean the queue
    if (!queue.staffList || queue.staffList.length === 0) {
      const openQuestions = queue.questions.filter((q) =>
        Object.values(OpenQuestionStatus),
      );
      await Promise.all(
        openQuestions.map(async (q: QuestionModel) => {
          q.status = 'Stale';
          await q.save();
        }),
      );
    }
  }
}
