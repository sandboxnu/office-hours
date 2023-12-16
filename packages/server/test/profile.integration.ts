import {
  StudentCourseFactory,
  UserFactory,
  CourseFactory,
  ProfSectionGroupsFactory,
  CourseSectionFactory,
  LastRegistrationFactory,
  OrganizationFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import { ProfileModule } from '../src/profile/profile.module';
import { PhoneNotifModel } from 'notification/phone-notif.entity';
import { DesktopNotifModel } from 'notification/desktop-notif.entity';
import { OrganizationUserModel } from 'organization/organization-user.entity';
import { AccountType } from '@koh/common';

describe('Profile Integration', () => {
  const supertest = setupIntegrationTest(ProfileModule);

  describe('GET /profile', () => {
    it('returns the logged-in user profile', async () => {
      const organization = await OrganizationFactory.create();
      const user = await UserFactory.create();
      const fundies = await CourseFactory.create({ name: 'CS 2500' });
      await StudentCourseFactory.create({ course: fundies, user });
      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .get('/profile')
        .expect(200);
      expect(res.body).toMatchSnapshot();
    });

    it('returns account deactivated error', async () => {
      const user = await UserFactory.create({ accountDeactivated: true });
      await supertest({ userId: user.id }).get('/profile').expect(403);
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

    it('returns pending courses when they exist', async () => {
      const prof1KhouryCourses = [
        {
          name: 'Fundies 1',
          crns: [123, 456],
          semester: '202110',
        },
        {
          name: 'OOD',
          crns: [798],
          semester: '202110',
        },
      ];
      const prof1 = await UserFactory.create();
      await ProfSectionGroupsFactory.create({
        prof: prof1,
        sectionGroups: prof1KhouryCourses,
      });
      await LastRegistrationFactory.create({
        prof: prof1,
        lastRegisteredSemester: '202010',
      });
      const fundies1 = await CourseFactory.create();
      await CourseSectionFactory.create({ crn: 123, course: fundies1 });
      await CourseSectionFactory.create({ crn: 456, course: fundies1 });

      const res = await supertest({ userId: prof1.id })
        .get('/profile')
        .expect(200);

      expect(res.body.pendingCourses).toEqual([
        prof1KhouryCourses[0],
        prof1KhouryCourses[1],
        // {
        //   name: 'OOD',
        //   crns: [798],
        //   semester: '202110',
        // },
      ]);
    });
  });

  describe('DELETE /profile/delete_profile_picture', () => {
    it("should delete profile picture from database only if it's URL", async () => {
      const user = await UserFactory.create({
        photoURL: 'https://www.google.com',
      });
      await supertest({ userId: user.id })
        .delete('/profile/delete_profile_picture')
        .expect(200);
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
        message: 'Profile updated successfully',
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
        message: 'Profile updated successfully',
      });
    });

    it('should not update profile settings if email is included and account is not legacy', async () => {
      const user = await UserFactory.create({
        email: 'test@ubc.ca',
        accountType: AccountType.GOOGLE,
      });

      const res = await supertest({ userId: user.id })
        .patch('/profile')
        .send({ email: 'test@ubc.ca', firstName: 'test' });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        message: 'Email cannot be updated',
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

    it('lets ta change default teams message', async () => {
      const user = await UserFactory.create();
      let profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.defaultMessage).toEqual(null);
      await supertest({ userId: user.id })
        .patch('/profile')
        .send({ defaultMessage: "Hello! It's me :D" })
        .expect(200);
      profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.defaultMessage).toEqual("Hello! It's me :D");
    });

    it('lets ta change includeDefaultMessage', async () => {
      const user = await UserFactory.create();
      let profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.includeDefaultMessage).toEqual(true);
      await supertest({ userId: user.id })
        .patch('/profile')
        .send({ includeDefaultMessage: false })
        .expect(200);
      profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.includeDefaultMessage).toEqual(false);
    });

    it('lets user change email', async () => {
      const user = await UserFactory.create();
      let profile = await supertest({ userId: user.id }).get('/profile');
      const newEmail = 'new_test_email@ubc.ca';

      expect(profile.body?.email).toEqual(user.email);
      await supertest({ userId: user.id })
        .patch('/profile')
        .send({ email: newEmail })
        .expect(200);

      profile = await supertest({ userId: user.id }).get('/profile');
      expect(profile.body?.email).toEqual(newEmail);
    });

    it('fails to change user email when email is used by another user', async () => {
      const user = await UserFactory.create();
      await UserFactory.create({ email: 'test@ubc.ca' });

      await supertest({ userId: user.id })
        .patch('/profile')
        .send({ email: 'test@ubc.ca' })
        .expect(400);
    });
  });
});
