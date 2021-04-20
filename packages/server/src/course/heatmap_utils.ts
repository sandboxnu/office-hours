import { Heatmap, timeDiffInMins } from '@koh/common';
import { inRange, mean, range } from 'lodash';
import { QuestionModel } from 'question/question.entity';
import { OfficeHourModel } from './office-hour.entity';
import moment = require('moment');

// originally part of heatmap.service.ts
// Rewind through the last few weeks and for each time interval,
// figure out how long wait time would have been if you had joined the queue at that time
// Timezone should be IANA

// Returns heatmap in the timezone (ie 3rd bucket is 3am in that timezone)
export function generateHeatMapWithReplay(
  questions: QuestionModel[],
  hours: OfficeHourModel[],
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
  console.log('literlaly the first thing');
  const hourTimestamps: [number, number][] = hours
    .filter((hours) => hours.startTime && hours.endTime)
    .map((hours) => [hours.startTime.getTime(), hours.endTime.getTime()]);
  console.log('past timestamps');

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
    function getSampleTimepointsInDateRange(date1: Date, date2: Date): Date[] {
      const ret = [];
      let curr = getNextSampleTimepoint(date1);
      console.log('bitch', date1, curr, date2);
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

      console.log(
        'curr, next',
        curr,
        next,
        isLast,
        curr.createdAt,
        next.createdAt,
      );

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
