import { ClosedQuestionStatus, Heatmap, timeDiffInMins } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { groupBy, mapKeys, mapValues, sum, sumBy } from 'lodash';
import moment = require('moment');
import { Command } from 'nestjs-command';
import { QuestionModel } from 'question/question.entity';

const BUCKET_SIZE_IN_MINS = 60;

@Injectable()
export class HeatmapService {
  async getHeatmapFor(courseId: number): Promise<Heatmap> {
    console.time('heatmap');
    const questions = await QuestionModel.createQueryBuilder('question')
      .leftJoinAndSelect('question.queue', 'queue')
      .where('queue.courseId = :courseId', { courseId })
      .andWhere('question.createdAt > :recent', {
        recent: moment().subtract(5, 'weeks').toISOString(),
      })
      .getMany();

    const heatmap = this.generateHeatMap(questions);
    console.timeEnd('heatmap');
    return heatmap;
  }

  private generateHeatMap(questions: QuestionModel[]): Heatmap {
    const completedQuestions = questions.filter(
      (q) => q.helpedAt && q.status === ClosedQuestionStatus.Resolved,
    );
    console.log(`generating heat map from ${questions.length} questions`);
    const questionBuckets: QuestionModel[][][] =  [...Array(7)].map(() =>
      [...Array(24)].map(() => []),
    );
    for (const q of completedQuestions) {
      const [day, hour] = this.bucketDate(q.createdAt);
      questionBuckets[day][hour].push(q);
    }
    console.log(questionBuckets[0]);
    const heatmap: Heatmap = [];
    for (const day of questionBuckets) {
      const dayMedians = [];
      for (const hour of day) {
        const waitTimes = hour.map((q) =>
          timeDiffInMins(q.helpedAt, q.createdAt),
        );
        waitTimes.sort();
        const median = waitTimes[Math.floor(waitTimes.length / 2)];
        dayMedians.push(median);
      }
      heatmap.push(dayMedians);
    }
    // const pretty = mapKeys(
    //   heatmap,
    //   (_, n) => `Day ${Math.floor(Number(n) / 24)}, Hour ${Number(n) % 24}`,
    // );
    // console.log(pretty);

    // bucket by day
    return heatmap;
  }

  // get the bucket for a date as [dayofweek, hour]
  private bucketDate(date: Date): [number, number] {
    // Sunday of the week of date (since bucketing is weekly)
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());
    sunday.setHours(0, 0, 0, 0);
    const minuteDiff = timeDiffInMins(date, sunday);
    const bucketnum = Math.floor(minuteDiff / BUCKET_SIZE_IN_MINS);
    return [Math.floor(bucketnum / 24), bucketnum % 24];
  }

  @Command({
    command: 'heatmap:generate',
    describe: 'generate heatmap for a course',
    autoExit: true,
  })
  async create(): Promise<void> {
    const h = await this.getHeatmapFor(4);
  }
}
