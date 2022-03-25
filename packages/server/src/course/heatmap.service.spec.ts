import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionModel } from 'question/question.entity';
import { Connection } from 'typeorm';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { HeatmapService } from './heatmap.service';
import { ClosedQuestionStatus, Heatmap } from '@koh/common';

describe('HeatmapService', () => {
  let _service: HeatmapService;
  let _conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, CacheModule.register()],
      providers: [HeatmapService],
    }).compile();

    _service = module.get<HeatmapService>(HeatmapService);
    _conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await _conn.close();
  });
  it('_', () => {
    expect(3).toEqual(2 + 1);
  });

  describe('generateHeatmap with replay', () => {
    // Return a list of question models from a list of ISO String pairs representing start and end times
    function questionsFromDates(
      questionTimes: [string, string][],
    ): QuestionModel[] {
      return questionTimes.map(([createdAt, helpedAt]) =>
        QuestionModel.create({
          createdAt: new Date(createdAt),
          helpedAt: new Date(helpedAt),
          text: 'pls help',
          status: ClosedQuestionStatus.Resolved,
        }),
      );
    }

    // Return a list of office hour models from a list of ISO String pairs representing start and end times

    // OCT 8 is a Thursday (EDT timezone)
    const OCT8 = (start: string, end: string): [string, string] => [
      `2020-10-08T${start}:00-0400`,
      `2020-10-08T${end}:00-0400`,
    ];

    // OCT 4 is a Sunday
    const OCT4 = (start: string, end: string): [string, string] => [
      `2020-10-04T${start}:00-0400`,
      `2020-10-04T${end}:00-0400`,
    ];

    // OCT 11 is a Sunday
    const OCT11 = (start: string, end: string): [string, string] => [
      `2020-10-11T${start}:00-0400`,
      `2020-10-11T${end}:00-0400`,
    ];

    // OCT 18 is a Sunday
    const OCT18 = (start: string, end: string): [string, string] => [
      `2020-10-18T${start}:00-0400`,
      `2020-10-18T${end}:00-0400`,
    ];

    const BUCKET_SIZE = 60;
    const SAMPLES_PER_BUCKET = 4;
    // Sample timepoints for bucket N are at N:00, N:15, N:30, N:45

    function officehoursFromDates(
      hoursTimes: [string, string][],
    ): [number, number][] {
      return hoursTimes.map(([start, end]) => [
        new Date(start).getTime(),
        new Date(end).getTime(),
      ]);
    }

    // Generate a heatmap from the historical question times and office hours times
    function heatmapFromDates(
      questionTimes: [string, string][],
      hoursTimes: [string, string][],
    ): Heatmap {
      return _service._generateHeatMapWithReplay(
        questionsFromDates(questionTimes),
        officehoursFromDates(hoursTimes),
        'America/New_York',
        BUCKET_SIZE,
        SAMPLES_PER_BUCKET,
      );
    }

    const emptyHeatmap = () => [...Array(24 * 7)].map(() => -1);
    const sparseHeatmap = (records: Record<number, number>) =>
      Object.assign(emptyHeatmap(), records);

    it('returns heatmap for no questions and no hours', () => {
      const heatmap = heatmapFromDates([], []);
      const expected = emptyHeatmap();
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap for no questions during office hours', () => {
      const heatmap = heatmapFromDates([], [OCT4('03:00', '04:00')]);
      const expected = sparseHeatmap({ 3: 0 });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap for just one question', () => {
      const heatmap = heatmapFromDates(
        [OCT4('03:01', '03:16')],
        [OCT4('03:00', '04:00')],
      );
      const expected = sparseHeatmap({ 3: 1 / 4 });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions overlap within 1 bucket', () => {
      const heatmap = heatmapFromDates(
        [
          OCT4('02:59', '03:10'), // spans first timepoint
          OCT4('03:05', '03:21'), // spans second timepoint
          OCT4('03:10', '03:31'), // spans second and third timepoint
          OCT4('03:48', '03:58'), // spans third timepoint
        ],
        [OCT4('03:00', '04:00')],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     2:45    | 0 min       |
       *     3:00    | 10 minutes  |  Q1
       *     3:15    | 16 mintues  |  Q3
       *     3:30    | 1 minutes   |  Q3
       *     3:45    | 0 minutes   |
       *
       *  Average timepoint wait = 6.75
       */
      const expected = sparseHeatmap({
        3: 6.75,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions overlap spanning multiple buckets', () => {
      const heatmap = heatmapFromDates(
        [
          OCT4('03:29', '04:10'), // spans two buckets
          OCT4('04:01', '04:21'), // spans first 4 o clock bucket
        ],
        [OCT4('03:00', '05:00')],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    |  0 mintues  |
       *     3:30    | 40 minutes  |  Q1
       *     3:45    | 25 minutes  |  Q1
       *     4:00    | 10 minutes  |  Q1
       *     4:15    |  6 minutes  |  Q2
       *
       *  3-4 bucket avg: 16.25
       *  4-5 bucket avg: 4
       */
      const expected = sparseHeatmap({
        3: 16.25,
        4: 4,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions overlap spanning multiple buckets and a question is skipped', () => {
      const heatmap = heatmapFromDates(
        [
          OCT4('03:29', '04:10'), // spans two buckets
          OCT4('04:01', '04:21'), // spans first 4 o clock bucket
          OCT4('04:05', '04:16'), // somehow gets help before the previous guy
        ],
        [OCT4('03:00', '05:00')],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    |  0 mintues  |
       *     3:30    | 40 minutes  |  Q1
       *     3:45    | 25 minutes  |  Q1
       *     4:00    | 10 minutes  |  Q1
       *     4:15    |  1 minutes  |  Q3
       *
       *  3-4 bucket avg: 16.25
       *  4-5 bucket avg: 2.75
       */
      const expected = sparseHeatmap({
        3: 16.25,
        4: 2.75,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when large gap between questions', () => {
      const heatmap = heatmapFromDates(
        [
          OCT4('03:10', '03:30'),
          OCT4('07:01', '07:21'), // much later question
        ],
        [OCT4('03:00', '04:00'), OCT4('07:00', '08:00')],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    | 15 mintues  |  Q1
       *     3:30    |  0 minutes  |
       *     3:45    |  0 minutes  |
       *
       *     7:00    |  0 minutes  |
       *     7:15    |  6 minutes  |  Q2
       *
       *  3-4 bucket avg: 15/4
       *  7-8 bucket avg: 6/4
       */
      const expected = sparseHeatmap({
        3: 15 / 4,
        7: 6 / 4,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap where a question is asked outside of scheduled office hours', () => {
      const heatmap = heatmapFromDates(
        [OCT4('03:10', '03:30')],
        [OCT4('07:00', '08:00')],
      );
      const expected = sparseHeatmap({
        7: 0,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions are later in the week', () => {
      const heatmap = heatmapFromDates(
        [
          OCT4('03:29', '04:10'),
          OCT4('04:01', '04:21'),
          // Thursday
          OCT8('03:29', '04:14'),
          OCT8('04:01', '04:21'),
        ],
        [OCT4('03:00', '05:00'), OCT8('03:00', '05:00')],
      );
      const expected = sparseHeatmap({
        3: 16.25,
        4: 4,
        [24 * 4 + 3]: 73 / 4,
        [24 * 4 + 4]: 5,
      });

      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions are across multiple weeks', () => {
      // avg of the office hours results
      const heatmap = heatmapFromDates(
        [
          OCT4('03:29', '04:10'),
          OCT4('04:01', '04:21'),

          OCT11('03:21', '04:25'),
          OCT11('04:22', '04:55'),
        ],
        [OCT4('03:00', '05:00'), OCT11('03:00', '05:00')],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    |  0 mintues  |
       *     3:30    | 40 minutes  |  Q1
       *     3:45    | 25 minutes  |  Q1
       *     4:00    | 10 minutes  |  Q1
       *     4:15    |  6 minutes  |  Q2
       *
       *  3-4 bucket avg: 16.25
       *  4-5 bucket avg: 4
       *
       *
       *    Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    |  0 mintues  |
       *     3:30    | 55 minutes  |  Q1
       *     3:45    | 40 minutes  |  Q1
       *     4:00    | 25 minutes  |  Q1
       *     4:15    | 10 minutes  |  Q2
       *     4:30    | 25 minutes  |
       *     4:45    | 10 minutes  |  Q2
       *     5:00    |  0 minutes  |  Q2
       *
       *  3-4 bucket avg: 23.75
       *  4-5 bucket avg: 17.5
       *
       * ------OVERALL-----
       * 3-4 bucket avg: 20
       * 4-5 bucket avg: 10.75
       */

      const expected = sparseHeatmap({
        3: 20,
        4: 10.75,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions are across multiple weeks but no office hours during one of the weeks', () => {
      // avg of the office hours results, ignore any -1s and divide accordingly (to get the right avg)
      const heatmap = heatmapFromDates(
        [OCT4('03:29', '04:10'), OCT18('03:21', '04:25')],
        [OCT4('03:00', '04:00'), OCT18('03:00', '04:00')],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    |  0 mintues  |
       *     3:30    | 40 minutes  |  Q1
       *     3:45    | 25 minutes  |  Q1
       *
       *  3-4 bucket avg: 16.25
       *
       *    Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    |  0 minutes  |
       *     3:15    |  0 mintues  |
       *     3:30    | 55 minutes  |  Q1
       *     3:45    | 40 minutes  |  Q1
       *
       *  3-4 bucket avg: 23.75
       *
       * ------OVERALL-----
       * 3-4 bucket avg: 20
       */

      const expected = sparseHeatmap({
        3: 20,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap during a week with daylight savings fall back', () => {
      // while course is in America/New_York
      const heatmap = heatmapFromDates(
        [
          [`2020-10-25T08:04:00.000Z`, `2020-10-25T08:32:00.000Z`],
          [`2020-11-01T09:04:00.000Z`, `2020-11-01T09:32:00.000Z`],
        ],
        [
          [`2020-10-25T08:00:00.000Z`, `2020-10-25T09:00:00.000Z`],
          [`2020-11-01T09:00:00.000Z`, `2020-11-01T10:00:00.000Z`], // same office hour after falling back
        ],
      );
      /**
       * For both weeks wait time is 19/4
       */

      const expected = sparseHeatmap({
        4: 19 / 4,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap during a week with daylight savings, but the course is not in a DST timezone', () => {
      // Honolulu doesn't have DST (Pacific/Honolulu)
      const heatmap = _service._generateHeatMapWithReplay(
        questionsFromDates([
          [`2020-10-25T04:04:00-1000`, `2020-10-25T04:32:00-1000`],
          [`2020-11-01T05:04:00-1000`, `2020-11-01T05:32:00-1000`],
        ]),
        officehoursFromDates([
          [`2020-10-25T04:00:00-1000`, `2020-10-25T05:00:00-1000`],
          [`2020-11-01T05:00:00-1000`, `2020-11-01T06:00:00-1000`], // same office hour after falling back
        ]),
        'Pacific/Honolulu',
        BUCKET_SIZE,
        SAMPLES_PER_BUCKET,
      );
      /**
       * For both weeks wait time is 19/4
       */

      const expected = sparseHeatmap({
        4: 19 / 4,
        5: 19 / 4,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap during a week with daylight savings spring forward', () => {
      // while course is in America/New_York
      const heatmap = heatmapFromDates(
        [
          // Saturday
          [`2020-03-07T08:04:00.000Z`, `2020-03-07T08:32:00.000Z`],
          [`2020-03-14T07:04:00.000Z`, `2020-03-14T07:32:00.000Z`],
        ],
        [
          [`2020-03-07T08:00:00.000Z`, `2020-03-07T09:00:00.000Z`],
          [`2020-03-14T07:00:00.000Z`, `2020-03-14T08:00:00.000Z`], // same office hour after spring forward
        ],
      );
      /**
       * For both weeks wait time is 19/4
       */

      const expected = sparseHeatmap({
        [24 * 6 + 3]: 19 / 4,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap during fall back with question crossing boundary', () => {
      // while course is in America/New_York
      const heatmap = heatmapFromDates(
        [
          [`2020-11-01T05:44:00.000Z`, `2020-11-01T06:12:00.000Z`], // 1:44 EDT -> 1:12 EST
        ],
        [[`2020-11-01T05:00:00.000Z`, `2020-11-01T07:00:00.000Z`]],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     1:45    | 27 minutes  | Q1
       *
       *     1:00    | 12 mintues  | Q1
       *
       * we have to divide by 8 because this hour happened twice
       **/

      const expected = sparseHeatmap({
        1: 39 / 8,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap during spring forward with question crossing boundary', () => {
      // while course is in America/New_York
      const heatmap = heatmapFromDates(
        [
          [`2020-03-08T06:44:00.000Z`, `2020-03-08T07:12:00.000Z`], // 1:44 EST -> 3:12 EDT
        ],
        [[`2020-03-08T06:00:00.000Z`, `2020-03-08T08:00:00.000Z`]],
      );
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     1:45    | 27 minutes  | Q1
       *
       *     3:00    | 12 mintues  | Q1
       *
       *
       *   We don't bucket for 2AM at all.
       **/

      const expected = sparseHeatmap({
        1: 27 / 4,
        2: 0,
        3: 12 / 4,
      });
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when a question crosses the midnight boundary', () => {
      // should be completely ignored
      const heatmap = heatmapFromDates(
        [[`2020-10-11T05:00:00.000Z`, `2020-10-12T02:00:00.000Z`]],
        [OCT4('03:00', '04:00')],
      );

      const expected = sparseHeatmap({
        3: 0,
      });
      expect(heatmap).toEqual(expected);
    });

    it('works when the bucketsize and sample interval are different', () => {
      const heatmap = _service._generateHeatMapWithReplay(
        questionsFromDates([OCT4('03:01', '03:11'), OCT8('05:12', '05:22')]),
        officehoursFromDates([OCT4('03:00', '04:00'), OCT8('05:00', '06:00')]),
        'America/New_York',
        24 * 60,
        1,
      );
      expect(heatmap).toEqual([0, -1, -1, -1, 0, -1, -1]);
    });
  });
});
