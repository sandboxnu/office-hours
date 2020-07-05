import {
  UserFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { DesktopNotif } from '../src/notification/desktop-notif.entity';
import { PhoneNotif } from '../src/notification/phone-notif.entity';
import { NotificationModule } from '../src/notification/notification.module';

describe('Notif Integration', () => {
  const supertest = setupIntegrationTest(NotificationModule);

  describe('GET /notifications/desktop/credentials', () => {
    it('gets a public key', async () => {
      const res = await supertest()
        .get('/notifications/desktop/credentials')
        .expect(200)
    });
  });

  describe('POST /notifications/desktop/register/:user_id', () => {
    it("registers a user + webpush endpoint, tests it's in the db", async () => {
      const user = await UserFactory.create();
      const expirDate = new Date(2020, 1, 2);
      await supertest()
        .post(`/notifications/desktop/register/${user.id}`)
        .send({
          endpoint: 'biggoogle.com',
          expirationTime: expirDate,
          keys: {
            p256dh: 'some_key',
            auth: 'some_key_as_well',
          },
        })
        .expect(201);
      expect(await DesktopNotif.findOne()).toEqual({
        auth: 'some_key_as_well',
        endpoint: 'biggoogle.com',
        expirationTime: expirDate,
        id: 1,
        p256dh: 'some_key',
        user: undefined,
        userId: user.id,
      });
    });
  });

  describe('POST /notifications/phone/register/:user_id', () => {
    it("registers a user & phone number, tests it's in the db", async () => {
      const user = await UserFactory.create();
      await supertest()
        .post(`/notifications/phone/register/${user.id}`)
        .send({ phoneNumber: '+16175551212' })
        .expect(201);

      const notifModel = await PhoneNotif.findOne();
      expect(notifModel).toEqual({
        id: 1,
        phoneNumber: '+16175551212',
        user: undefined,
        userId: 1,
      });
    });
  });

  describe('POST notifications/notify_user/:user_id', () => {
    it('tests that invalid endpoints for web push get deleted in db', async () => {
      // TODO this could be a unit test!
      const user = await UserFactory.create();
      const expirDate = new Date(2020, 2, 3);

      await supertest()
        .post(`/notifications/desktop/register/${user.id}`)
        .send({
          endpoint: 'biggoogle.com',
          expirationTime: expirDate,
          keys: {
            p256dh: 'some_key',
            auth: 'some_key_as_well',
          },
        })
        .expect(201);

      await supertest().post(`/notifications/notify_user/${user.id}`);

      const notifModels = await DesktopNotif.find();
      expect(notifModels).toEqual([]);
    });
  });
});
