import { OrganizationModule } from 'organization/organization.module';
import { setupIntegrationTest } from './util/testUtils';
import {
  CourseFactory,
  OrganizationFactory,
  UserFactory,
} from './util/factories';
import { OrganizationUserModel } from 'organization/organization-user.entity';
import { OrganizationCourseModel } from 'organization/organization-course.entity';
import { OrganizationRole, UserRole } from '@koh/common';

describe('Organization Integration', () => {
  const supertest = setupIntegrationTest(OrganizationModule);

  describe('POST /organization/:oid/add_member/:uid', () => {
    it('should return 403 when user is not logged in', async () => {
      const response = await supertest().post('/organization/1/add_member/1');

      expect(response.status).toBe(401);
    });

    it('should return 500 when user does not exist', async () => {
      const user = await UserFactory.create();
      const res = await supertest({ userId: user.id }).post(
        '/organization/1/add_member/0',
      );

      expect(res.status).toBe(500);
    });

    it("should return 200 when user doesn't exist in organization", async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      const res = await supertest({ userId: user.id }).post(
        `/organization/${organization.id}/add_member/${user.id}`,
      );

      expect(res.status).toBe(200);
    });

    it('should return 500 when user already exists in organization', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).post(
        `/organization/${organization.id}/add_member/${user.id}`,
      );

      expect(res.status).toBe(500);
    });
  });

  describe('POST /organization/:oid/add_course/:cid', () => {
    it('should return 403 when user is not logged in', async () => {
      const response = await supertest().post('/organization/1/add_course/1');

      expect(response.status).toBe(401);
    });

    it('should return 500 when course does not exist', async () => {
      const user = await UserFactory.create();
      const res = await supertest({ userId: user.id }).post(
        '/organization/1/add_course/0',
      );

      expect(res.status).toBe(500);
    });

    it("should return 200 when course doesn't exist in organization", async () => {
      const user = await UserFactory.create();
      const course = await CourseFactory.create();
      const organization = await OrganizationFactory.create();

      const res = await supertest({ userId: user.id }).post(
        `/organization/${organization.id}/add_course/${course.id}`,
      );

      expect(res.status).toBe(200);
    });

    it('should return 500 when course already exists in organization', async () => {
      const user = await UserFactory.create();
      const course = await CourseFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).post(
        `/organization/${organization.id}/add_course/${course.id}`,
      );

      expect(res.status).toBe(500);
    });
  });

  describe('GET /organization/:oid/get_users/:page?', () => {
    it('should return 403 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().get(
        `/organization/${organization.id}/get_users/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_users/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when user is an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_users/1`,
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET /organization/:oid/get_courses/:page?', () => {
    it('should return 403 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().get(
        `/organization/${organization.id}/get_courses/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_courses/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when user is an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_courses/1`,
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET /organization/:oid/stats', () => {
    it('should return 403 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().get(
        `/organization/${organization.id}/stats`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/stats`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when user is an admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.PROFESSOR,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/stats`,
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET /organization/:oid/get_user/:uid', () => {
    it('should return 403 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().get(
        `/organization/${organization.id}/get_user/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_user/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when searching for user not in the same organization', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const organizationTwo = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organizationTwo.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organizationTwo.id}/get_user/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to get info is not in the same organization', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const organizationTwo = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organizationTwo.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_user/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to get info is admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_user/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when user is found', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_user/${userTwo.id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET /organization/:oid', () => {
    it('should return 403 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().get(
        `/organization/${organization.id}`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 200 and response when user is logged in', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('PATCH /organization/:oid/update_account_access/:iud', () => {
    it('should return 401 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().patch(
        `/organization/${organization.id}/update_account_access/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_account_access/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to update is organization admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_account_access/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to update is global admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create({
        userRole: UserRole.ADMIN,
      });
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${userTwo.id}/update_account_access/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when user access is updated', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_account_access/${userTwo.id}`,
      );

      expect(res.status).toBe(200);
    });
  });

  describe('PATCH /organization/:oid/update_user_role', () => {
    it('should return 401 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().patch(
        `/organization/${organization.id}/update_user_role`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const userTwo = await UserFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_user_role`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 400 when request missing body', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const userTwo = await UserFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_user_role`,
      );

      expect(res.status).toBe(400);
    });

    it('should return 400 when user to update is organization admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_user_role`)
        .send({
          userId: userTwo.id,
          organizationRole: OrganizationRole.PROFESSOR,
        });

      expect(res.status).toBe(400);
    });

    it('should return 404 when user to update is not found', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_user_role`)
        .send({
          userId: 0,
          organizationRole: OrganizationRole.PROFESSOR,
        });

      expect(res.status).toBe(404);
    });

    it('should return 200 when user role is updated', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_user_role`)
        .send({
          userId: userTwo.id,
          organizationRole: OrganizationRole.PROFESSOR,
        });

      expect(res.status).toBe(200);
    });
  });

  describe('PATCH /organization/:oid/edit_user/:uid', () => {
    it('should return 401 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().patch(
        `/organization/${organization.id}/edit_user/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const userTwo = await UserFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/edit_user/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to update is global admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create({
        userRole: UserRole.ADMIN,
      });
      const organization = await OrganizationFactory.create();
      const userThree = await UserFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userThree.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/edit_user/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to update is organization admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'test@email.com',
          sid: 1234567,
        });

      expect(res.status).toBe(401);
    });

    it('should return 400 when firstName is too short', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: '',
          lastName: 'test',
          email: 'test@email.com',
          sid: 123456,
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 when lastName is too short', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: 'test',
          lastName: '              ',
          email: 'test@email.com',
          sid: 123459,
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 when email is too short', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: 'test',
          lastName: 'test',
          email: '          ',
          sid: 123459,
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 when student id is smaller than one', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create({
        sid: 200,
      });
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'test@mail.com',
          sid: -1,
        });

      expect(res.status).toBe(400);
    });

    it('should return 400 when user email to update is already in use', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      await UserFactory.create({
        email: 'test@mail.com',
      });
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'test@mail.com',
          sid: 23,
        });

      expect(res.body.message).toBe('Email is already in use');
      expect(res.status).toBe(400);
    });

    it('should return 200 when user is updated', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/edit_user/${userTwo.id}`)
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'test@mail.com',
          sid: 23,
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('User info updated');
    });
  });
});
