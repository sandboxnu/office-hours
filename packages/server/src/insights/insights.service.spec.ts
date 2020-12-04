import { Test, TestingModule } from '@nestjs/testing';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { Connection } from 'typeorm';
import { InsightsService } from './insights.service';
import { UserCourseFactory, QuestionFactory } from '../../test/util/factories';

describe('InsightsService', () => {
  let service: InsightsService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [InsightsService],
    }).compile();

    service = module.get<InsightsService>(InsightsService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  // it('generateInsightsFor', async () => {
  //     await UserCourseFactory.createList(4);
  //     await QuestionFactory.createList(2);
  //     const res = await service.generateInsightsFor({
  //         insights: [
  //             this.allInsights.totalStudents,
  //             this.allInsights.totalQuestionsAsked,
  //         ]
  //     });
  //     expect(res).toEqual([4, 2])
  //     });

  it('getTotalStudents', async () => {
    await UserCourseFactory.createList(6);
    expect(await service.getTotalStudents()).toEqual(6);
  });

  it('getTotalQuestionsAsked', async () => {
    await QuestionFactory.createList(22);
    expect(await service.getTotalQuestionsAsked()).toEqual(22);
  });

  it('getTotalStudents', async () => {
    await UserCourseFactory.createList(6);
    expect(await service.getTotalStudents()).toEqual(6);
  });

  it('getTotalQuestionsAsked', async () => {
    await QuestionFactory.createList(22);
    expect(await service.getTotalQuestionsAsked()).toEqual(22);
  });
});
