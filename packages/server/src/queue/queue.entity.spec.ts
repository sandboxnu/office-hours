import { ClosedQuestionStatus, OpenQuestionStatus } from '@koh/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';
import {
  OfficeHourFactory,
  QuestionFactory,
  QueueFactory,
} from '../../test/util/factories';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { QueueModel } from './queue.entity';

describe('queue entity', () => {
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
    }).compile();

    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  it('handles queueSize correctly', async () => {
    const queueFactory = await QueueFactory.create();

    await QuestionFactory.create({
      queue: queueFactory,
      status: OpenQuestionStatus.Queued,
    });
    await QuestionFactory.create({
      queue: queueFactory,
      status: OpenQuestionStatus.Drafting,
    });
    await QuestionFactory.create({
      queue: queueFactory,
      status: OpenQuestionStatus.Helping,
    });
    await QuestionFactory.create({
      queue: queueFactory,
      status: ClosedQuestionStatus.Resolved,
    });

    const otherQueueWithQuestions = await QueueFactory.create();
    for (let i = 0; i < 4; i++) {
      await QuestionFactory.create({
        queue: otherQueueWithQuestions,
        status: OpenQuestionStatus.Queued,
      });
    }

    const queue = await QueueModel.findOne(queueFactory.id);
    await queue.addQueueSize();

    expect(queue.queueSize).toBe(2);
  });

  it('areTheirOfficeHoursRightNow works when oh time spans across midnight', async () => {
    const oh = await OfficeHourFactory.create({
      startTime: new Date('2020-12-13T22:53:57.254Z'),
      endTime: new Date('2020-12-14T00:08:57.254Z'),
    });

    const queue = await QueueFactory.create({
      officeHours: [oh],
    });

    // greater than 10 min before office hours start
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-13T22:40:00.254Z'),
      ),
    ).toBeFalsy();

    // whithin 10 min of office hours start
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-13T22:50:00.254Z'),
      ),
    ).toBeTruthy();

    // during office hours and before midnight
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-13T22:58:57.254Z'),
      ),
    ).toBeTruthy();

    // during office hours and after midnight
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-14T00:04:00.254Z'),
      ),
    ).toBeTruthy();

    // after office hours
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-14T00:10:00.254Z'),
      ),
    ).toBeFalsy();
  });

  it('areTheirOfficeHoursRightNow works when office hours are during normal hours', async () => {
    const oh = await OfficeHourFactory.create({
      startTime: new Date('2020-12-10T09:00:00.254Z'),
      endTime: new Date('2020-12-10T10:00:00.254Z'),
    });

    const queue = await QueueFactory.create({
      officeHours: [oh],
    });

    // greater than 10 min before office hours start
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-10T08:40:00.254Z'),
      ),
    ).toBeFalsy();

    // whithin 10 min of office hours start
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-10T08:52:00.254Z'),
      ),
    ).toBeTruthy();

    // during office hours
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-10T09:23:00.254Z'),
      ),
    ).toBeTruthy();

    // after office hours
    expect(
      await queue.areThereOfficeHoursRightNow(
        new Date('2020-12-10T10:30:00.254Z'),
      ),
    ).toBeFalsy();
  });
});
