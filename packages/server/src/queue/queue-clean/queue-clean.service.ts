import { ClosedQuestionStatus, OpenQuestionStatus } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OfficeHourModel } from 'course/office-hour.entity';
import moment = require('moment');
import { Connection, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
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

    await Promise.all(
      queuesWithOpenQuestions.map((queue) => this.cleanQueue(queue.id)),
    );
  }

  public async cleanQueue(queueId: number, force?: boolean): Promise<void> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });

    if (force || !(await queue.checkIsOpen())) {
      queue.notes = '';
      await queue.save();
      await this.unsafeClean(queue.id);
    }
  }

  // Should we consider cleaning the queue?
  //  Checks if there are no staff, open questions and that there aren't any office hours soon
  public async shouldCleanQueue(queue: QueueModel): Promise<boolean> {
    if (queue.staffList.length === 0) {
      // Last TA to checkout, so check if we might want to clear the queue
      const areAnyQuestionsOpen =
        (await QuestionModel.openInQueue(queue.id).getCount()) > 0;
      if (areAnyQuestionsOpen) {
        const soon = moment().add(15, 'minutes').toDate();
        const areOfficeHourSoon =
          (await OfficeHourModel.count({
            where: {
              startTime: LessThanOrEqual(soon),
              endTime: MoreThanOrEqual(soon),
            },
          })) > 0;
        if (!areOfficeHourSoon) {
          return true;
        }
      }
    }
    return false;
  }

  private async unsafeClean(queueId: number): Promise<void> {
    const questions = await QuestionModel.openInQueue(queueId).getMany();
    const openQuestions = questions.filter(
      (q) => q.status in OpenQuestionStatus,
    );

    openQuestions.forEach((q: QuestionModel) => {
      q.status = ClosedQuestionStatus.Stale;
    });

    await QuestionModel.save(openQuestions);
  }
}
