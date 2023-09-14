import { QuestionStatusKeys } from '@koh/common';
import { TestingModule, Test } from '@nestjs/testing';
import { NotificationService } from 'notification/notification.service';
import { Connection } from 'typeorm';
import {
  QueueFactory,
  QuestionGroupFactory,
  QuestionFactory,
  UserFactory,
  TACourseFactory,
} from '../../test/util/factories';
import { TestTypeOrmModule, TestConfigModule } from '../../test/util/testUtils';
import { QuestionGroupModel } from './question-group.entity';
import { QuestionModel } from './question.entity';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [QuestionService, NotificationService],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('changeStatus', () => {
    it('removes question from a group if put into Limbo status', async () => {
      const queue = await QueueFactory.create();
      const ta = await UserFactory.create();
      const usercourse = await TACourseFactory.create({
        course: queue.course,
        user: ta,
      });
      const group = await QuestionGroupFactory.create({
        queue,
        creator: usercourse,
      });
      const g1q1 = await QuestionFactory.create({
        queue,
        groupable: true,
        group,
        taHelped: ta,
        status: QuestionStatusKeys.Helping,
      });
      const g1q2 = await QuestionFactory.create({
        queue,
        groupable: true,
        group,
        taHelped: ta,
        status: QuestionStatusKeys.Helping,
      });

      const resp = await service.changeStatus(
        QuestionStatusKeys.CantFind,
        g1q2,
        ta.id,
      );

      const updatedGroup = await QuestionGroupModel.findOne({
        where: { id: group.id },
        relations: ['questions'],
      });
      const updatedQ2 = await QuestionModel.findOne({
        where: { id: g1q2.id },
        relations: ['group'],
      });
      expect(resp).toMatchObject({
        status: QuestionStatusKeys.CantFind,
        groupId: null,
      });
      expect(updatedGroup.questions.length).toEqual(1);
      expect(updatedGroup.questions[0].id).toEqual(g1q1.id);
      expect(updatedQ2.group).toBeNull();
    });
  });
});
