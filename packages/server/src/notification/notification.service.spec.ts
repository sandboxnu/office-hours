import { Test, TestingModule } from '@nestjs/testing';
import { Connection, DeepPartial } from 'typeorm';
import { UserFactory } from '../../test/util/factories';
import { TestConfigModule, TestTypeOrmModule } from '../../test/util/testUtils';
import { DesktopNotifModel } from './desktop-notif.entity';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('registerDesktop', () => {
    it('does not create if already existing', async () => {
      const user = await UserFactory.create();
      const data: DeepPartial<DesktopNotifModel> = {
        userId: user.id,
        endpoint: 'bruh',
        p256dh: 'ji',
        auth: 'fd',
      };
      await service.registerDesktop(data);
      let dnotif = await DesktopNotifModel.find({ userId: user.id });
      expect(dnotif).toEqual([expect.objectContaining(data)]);

      // do it again, but it should skip
      await service.registerDesktop(data);
      dnotif = await DesktopNotifModel.find({ userId: user.id });
      expect(dnotif.length).toEqual(1);
    });
  });
});
