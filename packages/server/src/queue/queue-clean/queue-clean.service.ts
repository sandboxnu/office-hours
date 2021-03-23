import {
  ClosedQuestionStatus,
  OpenQuestionStatus,
  LimboQuestionStatus,
} from '@koh/common';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OfficeHourModel } from 'course/office-hour.entity';
import moment = require('moment');
import { Connection, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { QuestionModel } from '../../question/question.entity';
import { QueueModel } from '../queue.entity';
import { EventModel, EventType } from 'profile/event-model.entity';
import { CourseSectionMappingModel } from 'login/course-section-mapping.entity';

/**
 * Clean the queue and mark stale
 */
@Injectable()
export class QueueCleanService {
  constructor(private connection: Connection) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async cleanAllQueues(): Promise<void> {
    const queuesWithOpenQuestions: QueueModel[] = await QueueModel.getRepository()
      .createQueryBuilder('queue')
      .leftJoinAndSelect('queue_model.questions', 'question')
      .where('question.status IN (:...status)', {
        status: [...Object.values(OpenQuestionStatus), ...Object.values(LimboQuestionStatus)],
      })
      .getMany();

    await Promise.all(
      queuesWithOpenQuestions.map((queue) => this.cleanQueue(queue.id)),
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
          }).save();
        });
        queue.staffList = [];
      }
    });
    await QueueModel.save(queuesWithCheckedInStaff);
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
