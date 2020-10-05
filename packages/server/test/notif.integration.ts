import { UserFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { DesktopNotifModel } from '../src/notification/desktop-notif.entity';
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

  describe('POST notifications/desktop/device', () => {
    it('registers desktop notif', async () => {
      // TODO this could be a unit test!
      const user = await UserFactory.create({ desktopNotifsEnabled: true });
      const expirDate = new Date(2020, 2, 3);

      const res = await supertest({ userId: user.id })
        .post(`/notifications/desktop/device`)
        .send({
          endpoint: 'biggoogle.com',
          expirationTime: expirDate,
          keys: {
            p256dh: 'some_key',
            auth: 'some_key_as_well',
          },
          name: 'chrome',
        })
        .expect(201);
      expect(res.body).toEqual({
        createdAt: expect.any(String),
        name: 'chrome',
        endpoint: 'biggoogle.com',
        id: 1,
      });

      const notifModels = await DesktopNotifModel.find();
      expect(notifModels).toEqual([
        {
          auth: 'some_key_as_well',
          endpoint: 'biggoogle.com',
          expirationTime: expirDate,
          id: 1,
          p256dh: 'some_key',
          userId: 1,
          createdAt: expect.any(Date),
          name: 'chrome',
        },
      ]);
    });
  });

  describe('DELETE notifications/desktop/device', () => {
    it('removes desktop notif', async () => {
      // TODO this could be a unit test!
      const user = await UserFactory.create();
      const dn = await DesktopNotifModel.create({
        user,
        auth: '',
        p256dh: '',
        endpoint: 'abc',
      }).save();
      await dn.reload();
      expect(await DesktopNotifModel.count()).toEqual(1);

      await supertest({ userId: user.id })
        .delete(`/notifications/desktop/device/${dn.id}`)
        .expect(200);

      expect(await DesktopNotifModel.count()).toEqual(0);
    });

    it('does not let users remove other users desktopnotifs', async () => {
      // TODO this could be a unit test!
      const user = await UserFactory.create();
      const dn = await DesktopNotifModel.create({
        user,
        auth: '',
        p256dh: '',
        endpoint: 'abc',
      }).save();
      await dn.reload();
      expect(await DesktopNotifModel.count()).toEqual(1);

      const hackerman = await UserFactory.create();
      await supertest({ userId: hackerman.id })
        .delete(`/notifications/desktop/device/${dn.id}`)
        .expect(404);

      expect(await DesktopNotifModel.count()).toEqual(1);
    });
  });
});
