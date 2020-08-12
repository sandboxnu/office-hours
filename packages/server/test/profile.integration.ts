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
        phoneNumber: '911',
      });
      expect(
        await PhoneNotifModel.findOne({
          where: { userId: user.id, phoneNumber: '911' },
        }),
      ).toBeDefined();
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
  });
});
