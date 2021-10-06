import {
  StudentCourseFactory,
  UserFactory,
  CourseFactory,
  UserCourseFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { ProfileModule } from '../src/profile/profile.module';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { DesktopNotifModel } from 'notification/desktop-notif.entity';
import { Role } from '@koh/common';
import { UserCourseModel } from '../src/profile/user-course.entity';

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
        .send({ phoneNotifsEnabled: true, phoneNumber: '0987654321' })
        .expect(200);
      profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.phoneNumber).toEqual('real0987654321');
    });
  });

  describe('DELETE /profile/:id/withdraw_course', () => {
    it('tests the users ability to withdraw from their own course', async () => {
      const course = await CourseFactory.create();
      // extranous student, TA, and Professor
      const userS = await UserFactory.create({
        firstName: 's',
        lastName: 's',
        email: 'stu@neu.edu',
      });
      const userT = await UserFactory.create({
        firstName: 't',
        lastName: 't',
        email: 'ta@neu.edu',
      });
      const userP = await UserFactory.create({
        firstName: 'p2',
        lastName: 'p2',
        email: 'prof2@neu.edu',
      });
      const professor = await UserFactory.create({
        firstName: 'p',
        lastName: 'p',
        email: 'profm@neu.edu',
      });

      await UserCourseFactory.create({
        user: professor,
        role: Role.PROFESSOR,
        course,
      });

      await UserCourseFactory.create({
        user: userS,
        role: Role.STUDENT,
        course,
      });
      await UserCourseFactory.create({
        user: userT,
        role: Role.TA,
        course,
      });
      await UserCourseFactory.create({
        user: userP,
        role: Role.PROFESSOR,
        course,
      });

      // test student self-withdrawl

      await supertest({ userId: userS.id })
        .delete(`/profile/${course.id}/withdraw_course`)
        .send({ email: userS.email, role: Role.STUDENT })
        .expect(200);

      await supertest({ userId: userT.id })
        .delete(`/profile/${course.id}/withdraw_course`)
        .send({ email: userT.email, role: Role.TA })
        .expect(200);

      await supertest({ userId: userP.id })
        .delete(`/profile/${course.id}/withdraw_course`)
        .send({ email: userP.email, role: Role.PROFESSOR })
        .expect(200);

      const testSPresent = await UserCourseModel.findOne({
        where: {
          userId: userS.id,
        },
      });
      const testTPresent = await UserCourseModel.findOne({
        where: {
          userId: userT.id,
        },
      });
      const testPPresent = await UserCourseModel.findOne({
        where: {
          userId: userP.id,
        },
      });
      const userCourse = await UserCourseModel.findOne({
        where: { courseId: course.id, userId: professor.id },
      });
      expect(testSPresent).toBeUndefined();
      expect(testTPresent).toBeUndefined();
      expect(testPPresent).toBeUndefined();
      expect(userCourse).toBeDefined();
    });
  });
});
