import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Connection, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { QueueModel } from './queue.entity';
import { OpenQuestionStatus, ClosedQuestionStatus } from '@template/common';
import { QuestionModel } from '../question/question.entity';
import { OfficeHourModel } from '../course/office-hour.entity';

interface TimeInterval {
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class QueueService {
  constructor(private connection: Connection) {}

  public async addQueueTimes(queue: QueueModel) {
    const now = new Date();

    const officeHours = await this.getOfficeHours(queue.id);
    const timeIntervals = await this.generateMergedTimeIntervals(officeHours);
    const currTime = timeIntervals.find(
      (group) => group.startTime <= now && group.endTime >= now,
    );

    queue.startTime = currTime.startTime;
    queue.endTime = currTime.endTime;
  }

  private async getOfficeHours(queueId: number): Promise<OfficeHourModel[]> {
    const now = new Date();

    const lowerBound = new Date(now);
    lowerBound.setUTCHours(now.getUTCHours() - 24);
    lowerBound.setUTCHours(0, 0, 0, 0);

    const upperBound = new Date(now);
    upperBound.setUTCHours(now.getUTCHours() + 24);
    upperBound.setUTCHours(0, 0, 0, 0);

    return await OfficeHourModel.find({
      where: [
        {
          queueId: queueId,
          startTime: MoreThanOrEqual(lowerBound),
          endTime: LessThanOrEqual(upperBound),
        },
      ],
      order: {
        startTime: 'ASC',
      },
    });
  }

  private generateMergedTimeIntervals(
    officeHours: OfficeHourModel[],
  ): TimeInterval[] {
    const timeIntervals: TimeInterval[] = [];
    officeHours.forEach((officeHour) => {
      if (
        timeIntervals.length == 0 ||
        officeHour.startTime > timeIntervals[timeIntervals.length - 1].endTime
      ) {
        timeIntervals.push({
          startTime: officeHour.startTime,
          endTime: officeHour.endTime,
        });
        return;
      }

      const prevGroup = timeIntervals[timeIntervals.length - 1];
      timeIntervals[timeIntervals.length - 1].endTime =
        officeHour.endTime > prevGroup.endTime
          ? officeHour.endTime
          : prevGroup.endTime;
    });

    return timeIntervals;
  }

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
