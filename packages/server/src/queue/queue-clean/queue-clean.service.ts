import {
  ClosedQuestionStatus,
  LimboQuestionStatus,
  OpenQuestionStatus,
} from '@koh/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import async from 'async';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { Connection } from 'typeorm';
import { QuestionModel } from '../../question/question.entity';
import { QueueModel } from '../queue.entity';
import { AlertModel } from '../../alerts/alerts.entity';

/**
 * Clean the queue and mark stale
 */
@Injectable()
export class QueueCleanService {
  constructor(private connection: Connection) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanAllQueues(): Promise<void> {
    const queuesWithOpenQuestions: QueueModel[] =
      await QueueModel.getRepository()
        .createQueryBuilder('queue_model')
        .leftJoinAndSelect('queue_model.questions', 'question')
        .where('question.status IN (:...status)', {
          status: [
            ...Object.values(OpenQuestionStatus),
            ...Object.values(LimboQuestionStatus),
          ],
        })
        .getMany();

    // Clean 1 queue at a time
    await async.mapLimit(
      queuesWithOpenQuestions,
      1,
      async (queue) => await this.cleanQueue(queue.id),
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async checkoutAllStaff(): Promise<void> {
    const queuesWithCheckedInStaff: QueueModel[] =
      await QueueModel.getRepository().find({ relations: ['staffList'] });

    queuesWithCheckedInStaff.forEach(async (queue) => {
      await queue.staffList.forEach(async (ta) => {
        await EventModel.create({
          time: new Date(),
          eventType: EventType.TA_CHECKED_OUT_FORCED,
          userId: ta.id,
          courseId: queue.courseId,
          queueId: queue.id,
        }).save();
      });
      queue.staffList = [];
    });
    await QueueModel.save(queuesWithCheckedInStaff);
  }

  // TODO: move this to a course-clean service or something. This is just here because
  // this feature was pushed out in a time crunch.
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  public async cleanSelfEnrollOverrides(): Promise<void> {
    await UserCourseModel.delete({
      expires: true,
    });
  }

  public async cleanQueue(queueId: number, force?: boolean): Promise<void> {
    const queue = await QueueModel.findOne(queueId, {
      relations: ['staffList'],
    });

    if (force || !(await queue.checkIsOpen())) {
      await this.unsafeClean(queue.id);
    }
  }

  private async unsafeClean(queueId: number): Promise<void> {
    const questions = await QuestionModel.inQueueWithStatus(queueId, [
      ...Object.values(OpenQuestionStatus),
      ...Object.values(LimboQuestionStatus),
    ]).getMany();
    const alerts = await AlertModel.createQueryBuilder('alert')
      .where('alert.resolved IS NULL')
      .andWhere("(alert.payload ->> 'queueId')::INTEGER = :queueId ", {
        queueId,
      })
      .getMany();

    questions.forEach((q: QuestionModel) => {
      q.status = ClosedQuestionStatus.Stale;
      q.closedAt = new Date();
    });
    alerts.forEach((a: AlertModel) => {
      a.resolved = new Date();
    });

    await QuestionModel.save(questions);
    await AlertModel.save(alerts);
  }
}
