import {
  StudentCourseFactory,
  UserFactory,
  CourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { ProfileModule } from '../src/profile/profile.module';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { DesktopNotifModel } from 'notification/desktop-notif.entity';

describe('Profile Integration', () => {
  const supertest = setupIntegrationTest(ProfileModule);

  describe('GET /profile', () => {
    it('returns the logged-in user profile', async () => {
      const user = await UserFactory.create();
      const fundies = await CourseFactory.create({ name: 'CS 2500' });
      await StudentCourseFactory.create({ course: fundies, user });

      const res = await supertest({ userId: user.id })
        .get('/profile')
        .expect(200);
      expect(res.body).toMatchSnapshot();
    });

    it('returns only userCourses where course is enabled', async () => {
      const user = await UserFactory.create();
      const fundies = await CourseFactory.create({ name: 'CS 2500' });
      const nonEnabledCourse = await CourseFactory.create({
        name: 'CS 4900',
        enabled: false,
      });
      await StudentCourseFactory.create({ course: fundies, user });
      await StudentCourseFactory.create({ course: nonEnabledCourse, user });

      const res = await supertest({ userId: user.id })
        .get('/profile')
        .expect(200);

      expect(res.body.courses).toEqual([
        {
          course: {
            id: 1,
            name: 'CS 2500',
          },
          role: 'student',
        },
      ]);
    });

    it('returns desktop notif information', async () => {
      const user = await UserFactory.create();
      const dn = await DesktopNotifModel.create({
        user,
        auth: '',
        p256dh: '',
        endpoint: 'abc',
        name: 'firefox',
      }).save();
      await dn.reload();
      const res = await supertest({ userId: user.id })
        .get('/profile')
        .expect(200);
      expect(res.body.desktopNotifs).toEqual([
        {
          createdAt: expect.any(String),
          name: 'firefox',
          id: dn.id,
          endpoint: dn.endpoint,
        },
      ]);
    });

    it('returns 401 when not logged in', async () => {
      await UserFactory.create();
      await supertest().get('/profile').expect(401);
    });
  });

  describe('PATCH /profile', () => {
    it('enables desktop notifs', async () => {
      const user = await UserFactory.create({
        desktopNotifsEnabled: false,
        phoneNotifsEnabled: false,
      });
      const res = await supertest({ userId: user.id })
        .patch('/profile')
        .send({ desktopNotifsEnabled: true })
        .expect(200);
      expect(res.body).toMatchObject({
        desktopNotifsEnabled: true,
        phoneNotifsEnabled: false,
      });
    });
    it('enables phone notifs', async () => {
      const user = await UserFactory.create({
        desktopNotifsEnabled: false,
        phoneNotifsEnabled: false,
      });
      const res = await supertest({ userId: user.id })
        .patch('/profile')
        .send({ phoneNotifsEnabled: true, phoneNumber: '911' })
        .expect(200);
      expect(res.body).toMatchObject({
        desktopNotifsEnabled: false,
        phoneNotifsEnabled: true,
        phoneNumber: 'real911',
      });
    });
    it('does not let student enable without phone number', async () => {
      const user = await UserFactory.create({
        desktopNotifsEnabled: false,
        phoneNotifsEnabled: false,
      });
      await supertest({ userId: user.id })
        .patch('/profile')
        .send({ phoneNotifsEnabled: true })
        .expect(400);
    });
    it('lets student change phone number', async () => {
      const user = await UserFactory.create({
        desktopNotifsEnabled: false,
        phoneNotifsEnabled: true,
      });
      await PhoneNotifModel.create({
        phoneNumber: '1234567890',
        user: user,
        verified: true,
      }).save();
      let profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.phoneNumber).toEqual('1234567890');
      await supertest({ userId: user.id })
        .patch('/profile')
        .send({ phoneNumber: '0987654321' })
        .expect(200);
      profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.phoneNumber).toEqual('real0987654321');
    });
  });
});
