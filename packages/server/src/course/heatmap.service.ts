import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';
import { ClosedQuestionStatus, Heatmap, timeDiffInMins } from '@koh/common';
import moment = require('moment');
import { CourseModel } from './course.entity';
import { MoreThan } from 'typeorm';
import { QuestionModel } from '../question/question.entity';
import { EventModel } from '../profile/event-model.entity';
import { Command, Positional } from 'nestjs-command';
import { inRange, mean, range } from 'lodash';
import 'moment-timezone';

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

    const taEvents = await EventModel.find({
      where: { time: MoreThan(recent), courseId },
    });

    if (taEvents.length === 0) {
      return false;
    }

    const tz = (await CourseModel.findOne({ id: courseId })).timezone;

    function extractTimestamps(taEvents: EventModel[]) {
      const hours = [];
      taEvents.sort((a, b) => {
        return a.time.getTime() - b.time.getTime();
      });

      let iday = taEvents[0].time.getDate();
      let itime = taEvents[0].time.getTime();
      let etime = taEvents[0].time.getTime();
      for (let i = 1; i < taEvents.length; i++) {
        if (taEvents[i].time.getDate() == iday) {
          etime = taEvents[i].time.getTime();
        } else {
          hours.push([itime, etime]);
          iday = taEvents[i].time.getDate();
          itime = taEvents[i].time.getTime();
          etime = taEvents[i].time.getTime(); // new day
        }
      }

      hours.push([itime, etime]); // push last day.

      return hours;
    }

    let heatmap = this._generateHeatMapWithReplay(
      // Ignore questions that cross midnight (usually a fluke)
      questions.filter((q) => q.helpedAt.getDate() === q.createdAt.getDate()),
      extractTimestamps(taEvents),
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

  // PRIVATE function that is public for testing purposes
  // Rewind through the last few weeks and for each time interval,
  // figure out how long wait time would have been if you had joined the queue at that time
  // Timezone should be IANA
  // Returns heatmap in the timezone (ie 3rd bucket is 3am in that timezone)
  _generateHeatMapWithReplay(
    questions: QuestionModel[],
    hourTimestamps: [number, number][],
    timezone: string,
    bucketSize: number,
    samplesPerBucket: number,
  ): Heatmap {
    const sampleInterval = bucketSize / samplesPerBucket;
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
       - sample = Q1.helpedAt - timepoint (if negative, then it's 0)

  */

    function dateToBucket(date: Date | number): number {
      // parse in zone to handle daylight savings by getting day/hour/minute within that IANA zone
      const cInZone = moment.tz(date, timezone);
      return Math.floor(
        (cInZone.day() * 24 * 60 + cInZone.hour() * 60 + cInZone.minute()) /
          bucketSize,
      );
    }
    const timepointBuckets: number[][] = [
      ...Array((24 * 7 * 60) / bucketSize),
    ].map(() => []);

    if (questions.length) {
      const startDate = questions[0].createdAt;
      const sunday = moment.tz(startDate, timezone).startOf('week').toDate();

      function getNextTimepointIndex(date: Date): number {
        return Math.floor(timeDiffInMins(date, sunday) / sampleInterval) + 1;
      }

      // Get the date of the sample timepoint immediately after the given date
      function getNextSampleTimepoint(date: Date): Date {
        const timepointIndex = getNextTimepointIndex(date);
        return new Date(
          sunday.getTime() + timepointIndex * sampleInterval * 60 * 1000,
        );
      }

      // Get all timepoints between the two dates
      function getSampleTimepointsInDateRange(
        date1: Date,
        date2: Date,
      ): Date[] {
        const ret = [];
        let curr = getNextSampleTimepoint(date1);
        while (curr.getTime() < date2.getTime()) {
          ret.push(curr);
          curr = getNextSampleTimepoint(curr);
        }
        return ret;
      }

      // Get the start time of the current bucket
      function lastBucketBoundary(date: Date): moment.Moment {
        const startOfWeek = moment.tz(date, timezone).startOf('week');
        const m = moment(date);
        return m.subtract(m.diff(startOfWeek, 'm') % bucketSize, 'm');
      }

      // go two questions at a time
      let isFirst = true;
      for (let i = 0; i < questions.length; i++) {
        const curr = questions[i];
        const next = questions[i + 1];
        const isLast = i === questions.length - 1;

        // get the timepoints in between
        let sampledTimepoints = getSampleTimepointsInDateRange(
          isFirst
            ? lastBucketBoundary(curr.createdAt)
                .subtract(1, 's') // so that we get the first timepoint
                .toDate()
            : curr.createdAt,
          isLast
            ? lastBucketBoundary(curr.helpedAt)
                .add(bucketSize, 'm') // to get the nextBucketBoundary
                .toDate()
            : next.createdAt,
        );
        sampledTimepoints = sampledTimepoints.filter((time) =>
          hourTimestamps.some(([start, end]) =>
            inRange(time.getTime(), start, end),
          ),
        );

        // Pad the first bucket with zeros to account for timepoints before the first
        if (sampledTimepoints.length > 0 && isFirst) {
          isFirst = false;
        }
        // When we would have hypothetically gotten help at this timepoint
        for (const c of sampledTimepoints) {
          let wait = 0;
          if (
            inRange(
              c.getTime(),
              curr.createdAt.getTime(),
              curr.helpedAt.getTime(),
            )
          ) {
            wait = (curr.helpedAt.getTime() - c.getTime()) / 60000;
          }

          const bucketIndex = dateToBucket(c);
          timepointBuckets[bucketIndex].push(wait);
        }
      }
    }

    // Were there ever office hours in this bucket?
    const wereHoursDuringBucket: boolean[] = [
      ...Array((24 * 7 * 60) / bucketSize),
    ];
    for (const [start, end] of hourTimestamps) {
      //prevents an office hour from [N, M] to register in multiple buckets
      for (const i of range(dateToBucket(start), dateToBucket(end - 1) + 1)) {
        wereHoursDuringBucket[i] = true;
      }
    }

    const h: Heatmap = timepointBuckets.map((samples, i) => {
      if (samples.length > 0) {
        return mean(samples);
      } else if (wereHoursDuringBucket[i]) {
        return 0;
      } else {
        return -1;
      }
    });
    return h;
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
