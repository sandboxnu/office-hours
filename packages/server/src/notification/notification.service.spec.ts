import { Test, TestingModule } from '@nestjs/testing';
import { Connection, DeepPartial } from 'typeorm';
import { UserFactory } from '../../test/util/factories';
import {
  mockTwilio,
  TestConfigModule,
  TestTypeOrmModule,
} from '../../test/util/testUtils';
import { DesktopNotifModel } from './desktop-notif.entity';
import { NotificationService } from './notification.service';
import { PhoneNotifModel } from './phone-notif.entity';
import { TwilioService } from './twilio/twilio.service';

describe('NotificationService', () => {
  let service: NotificationService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [NotificationService, TwilioService],
    })
      .overrideProvider(TwilioService)
      .useValue(mockTwilio)
      .compile();

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

  describe('registerPhone', () => {
    it('creates new phone and gets real # from twilio', async () => {
      const user = await UserFactory.create();
      await service.registerPhone('123', user);

      const pnotif = await PhoneNotifModel.find({ userId: user.id });
      expect(pnotif).toEqual([
        expect.objectContaining({
          phoneNumber: 'real123',
          verified: false,
        }),
      ]);
    });
    it('just change phone number of existing phone notif if new # given', async () => {
      const user = await UserFactory.create();
      await service.registerPhone('123', user);

      let pnotif = await PhoneNotifModel.find({ userId: user.id });
      expect(pnotif).toEqual([
        expect.objectContaining({
          phoneNumber: 'real123',
        }),
      ]);
      await service.registerPhone('999', user);
      pnotif = await PhoneNotifModel.find({ userId: user.id });
      expect(pnotif).toEqual([
        expect.objectContaining({ phoneNumber: 'real999' }),
      ]);
    });
    it('does nothing when phone number the same', async () => {
      const user = await UserFactory.create();
      await service.registerPhone('123', user);

      let pnotif = await PhoneNotifModel.find({ userId: user.id });
      expect(pnotif).toEqual([
        expect.objectContaining({
          phoneNumber: 'real123',
        }),
      ]);
      await service.registerPhone('real123', user);
      pnotif = await PhoneNotifModel.find({ userId: user.id });
      expect(pnotif).toEqual([
        expect.objectContaining({
          phoneNumber: 'real123',
        }),
      ]);
    });
  });
});
