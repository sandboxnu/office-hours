import { ClosedQuestionStatus, Heatmap } from '@koh/common';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Command, Positional } from 'nestjs-command';
import { QuestionModel } from 'question/question.entity';
import { MoreThan } from 'typeorm';
import { CourseModel } from './course.entity';
import { generateHeatMapWithReplay } from './heatmap_utils';
import { OfficeHourModel } from './office-hour.entity';
import moment = require('moment');

function arrayRotate(arr, count) {
  count -= arr.length * Math.floor(count / arr.length);
  const spliced = arr.splice(0, count);
  return [...arr, ...spliced];
}

@Injectable()
export class HeatmapService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCachedHeatmapFor(courseId: number): Promise<Heatmap | false> {
    //One week
    const cacheLengthInSeconds = 604800;
    return this.cacheManager.wrap(
      `heatmap/${courseId}`,
      () => this._getHeatmapFor(courseId),
      { ttl: cacheLengthInSeconds },
    );
  }

  // Do not use this externally plz
  async _getHeatmapFor(courseId: number): Promise<Heatmap | false> {
    // The number of minutes to average across
    const BUCKET_SIZE_IN_MINS = 15;
    // Number of samples to gather per bucket
    const SAMPLES_PER_BUCKET = 3;
    console.time('heatmap');
    const recent = moment().subtract(8, 'weeks').toISOString();
    const questions = await QuestionModel.createQueryBuilder('question')
      .leftJoinAndSelect('question.queue', 'queue')
      .where('queue.courseId = :courseId', { courseId })
      .andWhere('question.status = :status', {
        status: ClosedQuestionStatus.Resolved,
      })
      .andWhere('question.helpedAt IS NOT NULL')
      .andWhere('question.createdAt > :recent', { recent })
      .orderBy('question.createdAt', 'ASC')
      .getMany();
    if (questions.length === 0) {
      return false;
    }

    const officeHours = await OfficeHourModel.find({
      where: { startTime: MoreThan(recent), courseId },
    });

    if (officeHours.length === 0) {
      return false;
    }

    const tz = (await CourseModel.findOne({ id: courseId })).timezone;
    let heatmap = generateHeatMapWithReplay(
      // Ignore questions that cross midnight (usually a fluke)
      questions.filter((q) => q.helpedAt.getDate() === q.createdAt.getDate()),
      officeHours,
      tz,
      BUCKET_SIZE_IN_MINS,
      SAMPLES_PER_BUCKET,
    );
    heatmap = arrayRotate(
      heatmap,
      -moment.tz.zone(tz).utcOffset(Date.now()) / BUCKET_SIZE_IN_MINS,
    );
    console.timeEnd('heatmap');
    return heatmap;
  }

  @Command({
    command: 'heatmap:generate <courseId>',
    describe: 'generate heatmap for a course',
    autoExit: true,
  })
  async create(
    @Positional({
      name: 'courseId',
      describe: 'which course the heatmap will be generated for',
      type: 'number',
    })
    courseId: number,
  ): Promise<void> {
    console.log(await this._getHeatmapFor(courseId));
  }
}
