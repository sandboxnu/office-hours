import { ClosedQuestionStatus, Heatmap, timeDiffInMins } from '@koh/common';
import { Injectable } from '@nestjs/common';
import { mean } from 'lodash';
import moment = require('moment');
import { Command } from 'nestjs-command';
import { QuestionModel } from 'question/question.entity';

// The number of minutes to average across
const BUCKET_SIZE_IN_MINS = 60;
// Number of samples to gather per bucket
const SAMPLES_PER_BUCKET = 5;
const SAMPLE_INTERVAL = BUCKET_SIZE_IN_MINS / SAMPLES_PER_BUCKET;

@Injectable()
export class HeatmapService {
  async getHeatmapFor(courseId: number): Promise<Heatmap> {
    console.time('heatmap');
    const questions = await QuestionModel.createQueryBuilder('question')
      .leftJoinAndSelect('question.queue', 'queue')
      .where('queue.courseId = :courseId', { courseId })
      .andWhere('question.status = :status', {
        status: ClosedQuestionStatus.Resolved,
      })
      .andWhere('question.helpedAt IS NOT NULL')
      .andWhere('question.createdAt > :recent', {
        recent: moment()
          .subtract(8, 'weeks')
          .toISOString(),
      })
      .orderBy('question.createdAt', 'ASC')
      .getMany();

    const heatmap = this.generateHeatMapWithReplay(
      // Ignore questions that cross midnight (usually a fluke)
      questions.filter(q => q.helpedAt.getDate() === q.createdAt.getDate()),
    );
    console.timeEnd('heatmap');
    return heatmap;
  }

  // Rewind through the last few weeks and for each time interval,
  // figure out how long wait time would have been if you had joined the queue at that time
  private generateHeatMapWithReplay(questions: QuestionModel[]): Heatmap {
    /*
    TEST: Question1 is  3:05 - 3:25
    // The next question is 3:21 - 3:49
    THe following question is 4:05 - 4:10
    
    Bucket = 60, Samples = 3, so timepoints are: 3:00, 3:20, 3:40.

    3:20 sample gets waittime of 5 minutes
    3:40 samples get waittimes of 9 minutes
    4:00 sample gets waittime of 0 minutes


    If i entered the queue at that time when should I have gotten help?
    Every interval of minutes for the past 5 weeks are aggregated (by taking the avg)
    
    analyze the buckets to find the closest time approximation

    look at question Q1 and the next question Q2
    for all sample timepoints between Q1.createdAt and Q2.createdAt:
       - sample = Q1.closedAt - timepoint (if negative, then it's 0)
    */

    const startDate = questions[0].createdAt;
    const sunday = new Date(startDate);
    sunday.setDate(startDate.getDate() - startDate.getDay());
    sunday.setHours(0, 0, 0, 0);

    function getNextTimepointIndex(date: Date): number {
      return Math.floor(timeDiffInMins(date, sunday) / SAMPLE_INTERVAL) + 1;
    }

    // Get the date of the sample timepoint immediately after the given date
    function getNextSampleTimepoint(date: Date): Date {
      const timepointIndex = getNextTimepointIndex(date);
      return new Date(
        sunday.getTime() + timepointIndex * SAMPLE_INTERVAL * 60 * 1000,
      );
    }

    function getSampleTimepointsInDateRange(date1: Date, date2: Date): Date[] {
      const ret = [];
      let curr = getNextSampleTimepoint(date1);
      while (curr.getTime() < date2.getTime()) {
        ret.push(curr);
        curr = getNextSampleTimepoint(curr);
      }
      return ret;
    }

    const allTimepointWaitTimes: number[] = [];

    // go two questions at a time
    for (let i = 0; i < questions.length - 1; i++) {
      const curr = questions[i];
      const next = questions[i + 1];

      // get the timepoints in between 
      const sampledTimepoints = getSampleTimepointsInDateRange(
        curr.createdAt,
        next.createdAt,
      );

      // When we would have gotten help at this timepoint 
      for (const c of sampledTimepoints) {
        allTimepointWaitTimes[getNextTimepointIndex(c)] = Math.max(
          0,
          (curr.helpedAt.getTime() - c.getTime()) / 60000,
        );
      }
    }

    // Bucket the timepoints
    const SAMPLES_PER_HOUR = 60 / SAMPLE_INTERVAL;
    const SAMPLES_PER_DAY = 24 * SAMPLES_PER_HOUR;
    const SAMPLES_PER_WEEK = 7 * SAMPLES_PER_DAY;
    const heatmap = [...Array(7)].map(() => [...Array(24)]);
    // for 24 hrs 7 days
    for (let day = 0; day < 7; day++) {
      for (let hour = 0; hour < 24; hour++) {
        const times = [];
        // Iterate through each week
        let week = 0;
        // index in alltimepoints array
        let index =
          week * SAMPLES_PER_WEEK +
          day * SAMPLES_PER_DAY +
          SAMPLES_PER_HOUR * hour;
        while (index < allTimepointWaitTimes.length) {
          for (
            let s = 0;
            s < SAMPLES_PER_BUCKET && index + s < allTimepointWaitTimes.length;
            s++
          ) {
            // Grab all the samples in this bucket from current week
            const t = allTimepointWaitTimes[index + s];
            if (t) {
              times.push(t);
            }
          }
          week++;
          index =
            week * SAMPLES_PER_WEEK +
            day * SAMPLES_PER_DAY +
            SAMPLES_PER_HOUR * hour;
        }
        // times.sort();
        // const median = times[Math.floor(times.length / 2)];
        heatmap[day][hour] = mean(times);
      }
    }

    return heatmap;
  }

  private generateHeatMap(questions: QuestionModel[]): Heatmap {
    const completedQuestions = questions.filter(
      q => q.helpedAt && q.status === ClosedQuestionStatus.Resolved,
    );
    console.log(`generating heat map from ${questions.length} questions`);
    const questionBuckets: QuestionModel[][][] = [...Array(7)].map(() =>
      [...Array(24)].map(() => []),
    );
    for (const q of completedQuestions) {
      const [day, hour] = this.bucketDate(q.createdAt);
      questionBuckets[day][hour].push(q);
    }
    const heatmap: Heatmap = [];
    for (const day of questionBuckets) {
      const dayMedians = [];
      for (const hour of day) {
        const waitTimes = hour
          .filter(q => q.helpedAt.getDate() === q.createdAt.getDate()) // Ignore questions that cross midnight (usually a fluke)
          .map(q => timeDiffInMins(q.helpedAt, q.createdAt));
        waitTimes.sort();
        const median = waitTimes[Math.floor(waitTimes.length / 2)];
        dayMedians.push(median);
      }
      heatmap.push(dayMedians);
    }

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
