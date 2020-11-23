import { ClosedQuestionStatus, OpenQuestionStatus } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { QuestionModel } from '../../question/question.entity';
import { QueueModel } from '../queue.entity';

/**
 * Clean the queue and mark stale
 */
@Injectable()
export class QueueCleanService {
  constructor(private connection: Connection) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async cleanAllQueues(): Promise<void> {
    const queuesWithOpenQuestions: QueueModel[] = await QueueModel.getRepository()
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue_model.questions', 'question')
      .where('question.status IN (:...status)', {
        status: Object.values(OpenQuestionStatus),
      })
      .getMany();

    queuesWithOpenQuestions.forEach((queue) => {
      this.cleanQueue(queue.id);
    });
  }

  public async cleanQueue(queueId: number): Promise<void> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });

    if (!(await queue.checkIsOpen())) {
      queue.notes = '';
      await queue.save();
      await this.unsafeClean(queue.id);
    }
  }

  private async unsafeClean(queueId: number): Promise<void> {
    const questions = await QuestionModel.openInQueue(queueId).getMany();
    const openQuestions = questions.filter(
      (q) => q.status in OpenQuestionStatus,
    );

    openQuestions.forEach((q: QuestionModel) => {
      q.status = ClosedQuestionStatus.Stale;
      q.closedAt = new Date();
    });

    await QuestionModel.save(openQuestions);
  }
}
