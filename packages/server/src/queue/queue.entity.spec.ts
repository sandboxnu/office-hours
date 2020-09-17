import { Connection } from "typeorm";
import { TestingModule, Test } from "@nestjs/testing";
import { TestTypeOrmModule } from "../../test/util/testUtils";
import { QueueFactory, QuestionFactory } from "../../test/util/factories";
import { QueueModel } from "./queue.entity";
import { OpenQuestionStatus, ClosedQuestionStatus } from "@koh/common";

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
            status: OpenQuestionStatus.Queued
        });
        await QuestionFactory.create({
            queue: queueFactory,
            status: OpenQuestionStatus.Drafting
        });       
        await QuestionFactory.create({
            queue: queueFactory,
            status: OpenQuestionStatus.Helping
        });       
        await QuestionFactory.create({
            queue: queueFactory,
            status: ClosedQuestionStatus.Resolved
        });
        
        const queue = await QueueModel.findOne(queueFactory.id);
        await queue.addQueueSize();

        expect(queue.queueSize).toBe(2);
      });
  });
  