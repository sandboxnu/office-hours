import { UserFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { DesktopNotifModel } from '../src/notification/desktop-notif.entity';
import { PhoneNotifModel } from '../src/notification/phone-notif.entity';
import { NotificationModule } from '../src/notification/notification.module';

describe('Notif Integration', () => {
  const supertest = setupIntegrationTest(NotificationModule);

  describe('GET /notifications/desktop/credentials', () => {
    it('gets a public key', async () => {
      await supertest({ userId: 99 })
        .get('/notifications/desktop/credentials')
        .expect(200);
    });
  });

  describe('POST /notifications/phone/register', () => {
    it("registers a user & phone number, tests it's in the db", async () => {
      const user = await UserFactory.create();
      await supertest({ userId: user.id })
        .post(`/notifications/phone/register`)
        .send({ phoneNumber: '+16175551212' })
        .expect(201);

      const notifModel = await PhoneNotifModel.findOne();
      expect(notifModel).toEqual({
        id: 1,
        phoneNumber: '+16175551212',
        verified: false,
        userId: user.id,
      });
    });
  });

  describe('POST notifications/desktop/register', () => {
    it('registers desktop notif', async () => {
      // TODO this could be a unit test!
      const user = await UserFactory.create({ desktopNotifsEnabled: true });
      const expirDate = new Date(2020, 2, 3);

      await supertest({ userId: user.id })
        .post(`/notifications/desktop/register`)
        .send({
          endpoint: 'biggoogle.com',
          expirationTime: expirDate,
          keys: {
            p256dh: 'some_key',
            auth: 'some_key_as_well',
          },
        })
        .expect(201);

      const notifModels = await DesktopNotifModel.find();
      expect(notifModels).toEqual({
        auth: 'some_key_as_well',
        endpoint: 'biggoogle.com',
        expirationTime: expirDate,
        id: 1,
        p256dh: 'some_key',
        userId: 1,
      });
    });
  });
});
