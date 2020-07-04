import {
  StudentCourseFactory,
  UserFactory,
  CourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { ProfileModule } from '../src/profile/profile.module';
import { DesktopNotif } from '../src/notification/desktop-notif.entity';
import { PhoneNotif } from 'src/notification/phone-notif.entity';

describe('Notif Integration', () => {
  const supertest = setupIntegrationTest(ProfileModule);

  describe('GET /notifications/desktop/credentials', () => {
    it('gets a public key', async () => {
      const res = await supertest()
        .get('/notifications/desktop/credentials')
        .expect(200)
        .expect('keyhaha')
      
    });
  });

  describe('POST /notifications/desktop/register/:user_id', () => {
    it("registers a user + webpush endpoint, tests it's in the db", async () => {
      const user = await UserFactory.create();
      const expirDate = new Date(2020, 1, 2);
      supertest()
        .post(`/notifications/desktop/register${user.id}`)
        .send({
          endpoint: 'biggoogle.com',
          expirationTime: expirDate,
          keys: {
            p256dh: 'some_key',
            auth: 'some_key_as_well',
          },
        })
        .expect(200);
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
      supertest()
        .post(`/notifications/phone/register/${user.id}`)
        .send({ phoneNumber: '+12345678900' })
        .expect(200);

      const notifModel = await PhoneNotif.findOne();
      expect(notifModel).toEqual({
        id: 1,
        phoneNumber: '+12345678900',
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
        .expect(200);

      await supertest().post(`/notifications/notify_user/${user.id}`);

      const notifModels = await DesktopNotif.find();
      expect(notifModels).toEqual([]);
    });
  });
});
