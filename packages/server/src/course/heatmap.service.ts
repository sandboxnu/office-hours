import {
  bucketDate,
  ClosedQuestionStatus,
  Heatmap,
  timeDiffInMins,
} from '@koh/common';
import { Injectable } from '@nestjs/common';
import { groupBy, mapKeys, mapValues, sum, sumBy } from 'lodash';
import moment = require('moment');
import { Command } from 'nestjs-command';
import { QuestionModel } from 'question/question.entity';

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
    const questionBuckets = groupBy(completedQuestions, (q) =>
      bucketDate(q.createdAt),
    );
    const heatmap: Record<number, { median: number }> = {};
    for (const [i, qs] of Object.entries(questionBuckets)) {
      const waitTimes = qs.map((q) => timeDiffInMins(q.helpedAt, q.createdAt));
      const averageWaitTime = sum(waitTimes) / waitTimes.length;
      const stdDev = Math.sqrt(
        sumBy(waitTimes, (w) => Math.pow(w - averageWaitTime, 2)) /
          waitTimes.length,
      );
      waitTimes.sort();
      const median = waitTimes[Math.floor(waitTimes.length / 2)];
      heatmap[i] = {
        // avg: averageWaitTime,
        median,
        // stdDev,
        // count: waitTimes.length,
        // data: waitTimes,
      };
    }
    const pretty = mapKeys(
      heatmap,
      (_, n) => `Day ${Math.floor(Number(n) / 24)}, Hour ${Number(n) % 24}`,
    );
    console.log(pretty);

    return mapValues(heatmap, (h) => h.median);
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
