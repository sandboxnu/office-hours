import {
  ClosedQuestionStatus,
  LimboQuestionStatus,
  OpenQuestionStatus,
} from '@koh/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import async from 'async';
import { OfficeHourModel } from 'course/office-hour.entity';
import { EventModel, EventType } from 'profile/event-model.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { Connection, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { QuestionModel } from '../../question/question.entity';
import { QueueModel } from '../queue.entity';
import moment = require('moment');

/**
 * Clean the queue and mark stale
 */
@Injectable()
export class QueueCleanService {
  constructor(private connection: Connection) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanAllQueues(): Promise<void> {
    const queuesWithOpenQuestions: QueueModel[] = await QueueModel.getRepository()
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
    const queuesWithCheckedInStaff: QueueModel[] = await QueueModel.getRepository().find(
      { relations: ['staffList'] },
    );

    queuesWithCheckedInStaff.forEach(async (queue) => {
      if (!(await queue.areThereOfficeHoursRightNow())) {
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
      }
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

  // Should we consider cleaning the queue?
  //  Checks if there are no staff, open questions and that there aren't any office hours soon
  public async shouldCleanQueue(queue: QueueModel): Promise<boolean> {
    if (queue.staffList.length === 0) {
      // Last TA to checkout, so check if we might want to clear the queue
      const areAnyQuestionsOpen =
        (await QuestionModel.inQueueWithStatus(
          queue.id,
          Object.values(OpenQuestionStatus),
        ).getCount()) > 0;
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
    const questions = await QuestionModel.inQueueWithStatus(queueId, [
      ...Object.values(OpenQuestionStatus),
      ...Object.values(LimboQuestionStatus),
    ]).getMany();

    questions.forEach((q: QuestionModel) => {
      q.status = ClosedQuestionStatus.Stale;
      q.closedAt = new Date();
    });

    await QuestionModel.save(questions);
  }
}
