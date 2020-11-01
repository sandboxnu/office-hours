import { ClosedQuestionStatus } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import moment = require('moment');
import { QuestionModel } from 'question/question.entity';
import { Connection } from 'typeorm';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { HeatmapService } from './heatmap.service';

describe('HeatmapService', () => {
  let service: HeatmapService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [HeatmapService],
    }).compile();

    service = module.get<HeatmapService>(HeatmapService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  describe('generateHeatmap with replay', () => {
    function resolvedQuestion(createdAt: Date, helpedAt: Date): QuestionModel {
      return QuestionModel.create({
        createdAt,
        helpedAt,
        text: 'pls help',
        status: ClosedQuestionStatus.Resolved,
      });
    }
    // Return a list of question models from a list of ISO String pairs representing start and end times
    function resolvedQuestions(
      questionTimes: [string, string][],
    ): QuestionModel[] {
      return questionTimes.map(([createdAt, helpedAt]) =>
        resolvedQuestion(new Date(createdAt), new Date(helpedAt)),
      );
    }

    const emptyHeatmap = () => [...Array(24 * 7)].map(() => -1);

    const BUCKET_SIZE = 60;
    const SAMPLES_PER_BUCKET = 4;
    // Sample timepoints for bucket N are at N:00, N:15, N:30, N:45

    it('returns heatmap for just one question', () => {
      const questions = resolvedQuestions([
        // 10-04 is Sunday
        ['2020-10-04T03:01:00.000Z', '2020-10-04T03:16:00.000Z'],
      ]);
      const heatmap = service._generateHeatMapWithReplay(questions, 60, 4);
      const expected = emptyHeatmap();
      expected[3] = 1 / 4;
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions overlap within 1 bucket', () => {
      const questions = resolvedQuestions([
        // 10-04 is Sunday
        ['2020-10-04T02:59:00.000Z', '2020-10-04T03:10:00.000Z'], // spans first timepoint
        ['2020-10-04T03:05:00.000Z', '2020-10-04T03:21:00.000Z'], // spans second timepoint
        ['2020-10-04T03:10:00.000Z', '2020-10-04T03:31:00.000Z'], // spans second and third timepoint
        ['2020-10-04T03:48:00.000Z', '2020-10-04T03:58:00.000Z'], // spans third timepoint
      ]);
      /**
       *   Timepoint | Wait time   | Question in front of you
       *   -----------------------------------------------------
       *     3:00    | 10 minutes  |  Q1
       *     3:15    | 16 mintues  |  Q3
       *     3:30    | 1 minutes   |  Q3
       *     3:45    | 0 minutes   |
       *
       *  Average timepoint wait = 6.75
       */
      const heatmap = service._generateHeatMapWithReplay(questions, 60, 4);
      const expected = emptyHeatmap();
      expected[3] = 6.75;
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when questions overlap spanning multiple bucket', () => {
      const questions = resolvedQuestions([
        // 10-04 is Sunday
        ['2020-10-04T03:30:00.000Z', '2020-10-04T04:10:00.000Z'], // spans two buckets
        ['2020-10-04T04:01:00.000Z', '2020-10-04T04:21:00.000Z'], // spans first 4 o clock bucket
        ['2020-10-04T04:05:00.000Z', '2020-10-04T04:16:00.000Z'], // somehow gets help before the previous guy
      ]);
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
      const heatmap = service._generateHeatMapWithReplay(questions, 60, 4);
      const expected = emptyHeatmap();
      expected[3] = 16.25;
      expected[4] = 2.75;
      expect(heatmap).toEqual(expected);
    });

    it('returns heatmap when large gap between questions', () => {
      const questions = resolvedQuestions([
        // 10-04 is Sunday
        ['2020-10-04T03:30:00.000Z', '2020-10-04T04:10:00.000Z'], // spans two buckets
        ['2020-10-04T04:01:00.000Z', '2020-10-04T04:21:00.000Z'], // spans first 4 o clock bucket
        ['2020-10-04T04:05:00.000Z', '2020-10-04T04:16:00.000Z'], // somehow gets help before the previous guy
      ]);

    });

    it('returns heatmap when questions are later in the week', () => {});

    it('returns heatmap when questions are across multiple weeks', () => {});

    it('returns heatmap during a week with daylight savings transition', () => {});
  });
});
