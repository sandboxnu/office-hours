import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection } from 'typeorm';
import { QueueModel } from './queue.entity';
import { OpenQuestionStatus, ClosedQuestionStatus } from '@template/common';
import { QuestionModel } from '../question/question.entity';

@Injectable()
export class QueueService {
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
      relations: ['staffList', 'questions', 'officeHours'],
    });

    if (!queue.isOpen()) {
      await this.unsafeClean(queue);
    }
  }

  private async unsafeClean(queue: QueueModel): Promise<void> {
    const openQuestions = queue.questions.filter(
      (q) => q.status in OpenQuestionStatus,
    );

    openQuestions.forEach((q: QuestionModel) => {
      q.status = ClosedQuestionStatus.Stale;
    });

    await QuestionModel.save(openQuestions);
  }
}
