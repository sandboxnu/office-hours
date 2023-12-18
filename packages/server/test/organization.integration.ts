import { OrganizationModule } from 'organization/organization.module';
import { setupIntegrationTest } from './util/testUtils';
import {
  CourseFactory,
  OrganizationFactory,
  SemesterFactory,
  UserFactory,
} from './util/factories';
import { OrganizationUserModel } from 'organization/organization-user.entity';
import { OrganizationCourseModel } from 'organization/organization-course.entity';
import { OrganizationRole, UserRole } from '@koh/common';
import * as fs from 'fs';
import * as path from 'path';
import { UserCourseModel } from 'profile/user-course.entity';

describe('Organization Integration', () => {
  const supertest = setupIntegrationTest(OrganizationModule);

  describe('POST /organization/:oid/add_user/:uid', () => {
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

  describe('GET /organization', () => {
    it('should return 200 and list of organizations', async () => {
      await OrganizationFactory.create();
      await OrganizationFactory.create();

      const res = await supertest().get('/organization').expect(200);

      expect(res.body).toMatchSnapshot();
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

  describe('PATCH /organization/:oid/update_course/:cid', () => {
    it('should return 401 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().patch(
        `/organization/${organization.id}/update_course/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_course/${course.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 404 when course not found', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/0`)
        .send({
          name: 'newName',
        });

      expect(res.status).toBe(404);
    });

    it('should return 400 when course name is too short', async () => {
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

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: '        ',
        });

      expect(res.body.message).toBe('Course name must be at least 1 character');
      expect(res.status).toBe(400);
    });

    it('should return 400 when course coordinator email is too short', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create({
        coordinator_email: 'test@ubc.ca',
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          coordinatorEmail: '        ',
        });

      expect(res.body.message).toBe(
        'Coordinator email must be at least 1 character',
      );
      expect(res.status).toBe(400);
    });

    it('should return 400 when section group name is too short', async () => {
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

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          sectionGroupName: '        ',
        });

      expect(res.body.message).toBe(
        'Section group name must be at least 1 character',
      );

      expect(res.status).toBe(400);
    });

    it('should return 400 when zoomLink is too short', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create({ zoomLink: 'test' });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();
      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          zoomLink: '        ',
          sectionGroupName: 'test',
        });

      expect(res.body.message).toBe('Zoom link must be at least 1 character');
      expect(res.status).toBe(400);
    });

    it('should return 400 when course timezone is not valid', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create({
        timezone: 'America/Los_Angeles',
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();
      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          timezone: 'invalid_timezone',
          sectionGroupName: 'test',
        });

      expect(res.body.message).toBe(
        'Timezone field is invalid, must be one of America/New_York, ' +
          'America/Los_Angeles, America/Chicago, America/Denver, America/Phoenix, ' +
          'America/Anchorage, America/Honolulu, Europe/London, Europe/Paris, ' +
          'Asia/Tokyo, Asia/Shanghai, Australia/Sydney',
      );
      expect(res.status).toBe(400);
    });

    it('should return 400 when semester id is not found', async () => {
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

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          timezone: 'America/Los_Angeles',
          sectionGroupName: 'test',
          semesterId: 230,
        });

      expect(res.body.message).toBe('Semester not found');
      expect(res.status).toBe(400);
    });

    it('should return 400 when semester id is not an integer', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await SemesterFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          timezone: 'America/Los_Angeles',
          sectionGroupName: 'test',
          semesterId: 'invalid_integer',
        });

      expect(res.body.message[0]).toBe('semesterId must be an integer number');
      expect(res.status).toBe(400);
    });

    it('should return 200 when course is updated', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      const semester = await SemesterFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();
      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update_course/${course.id}`)
        .send({
          name: 'newName',
          timezone: 'America/Los_Angeles',
          sectionGroupName: 'test',
          semesterId: semester.id,
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Course updated');
    });
  });

  describe('PATCH /organization/:oid/update_course_access/:cid', () => {
    it('should return 401 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().patch(
        `/organization/${organization.id}/update_course_access/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not an admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_course_access/${course.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 404 when course not found', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_course_access/0`,
      );

      expect(res.status).toBe(404);
    });

    it('should return 200 when course access is updated', async () => {
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

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_course_access/${course.id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Course access updated');
    });
  });

  describe('GET /organization/:oid/get_course/:cid', () => {
    it('should return 401 when user is not logged in', async () => {
      const organization = await OrganizationFactory.create();
      const response = await supertest().get(
        `/organization/${organization.id}/get_course/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when user is not admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();
      const course = await CourseFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_course/${course.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 404 when course is not found', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_course/0`,
      );

      expect(res.status).toBe(404);
    });

    it('should return course when course is found', async () => {
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
        `/organization/${organization.id}/get_course/${course.id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body).toMatchSnapshot();
    });
  });

  describe('GET /organization/:oid/get_banner/:photoUrl', () => {
    it('should return 401 when user is not logged in', async () => {
      const response = await supertest().get(`/organization/1/get_banner/1`);

      expect(response.status).toBe(401);
    });

    it('should return 404 when image is not found', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_banner/non_existing_image.png`,
      );

      expect(res.status).toBe(404);
    });

    it('should return 200 when image is found', async () => {
      const file = Buffer.from([]);
      const fileName = 'test.png';

      await fs.writeFileSync(
        `${process.env.UPLOAD_LOCATION}/${fileName}`,
        file,
      );

      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create({
        bannerUrl: fileName,
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_banner/${organization.bannerUrl}`,
      );

      expect(res.status).toBe(200);

      await fs.unlinkSync(path.join(process.env.UPLOAD_LOCATION, fileName));
    });
  });

  describe('GET /organization/:oid/get_logo/:photoUrl', () => {
    it('should return 401 when user is not logged in', async () => {
      const response = await supertest().get(`/organization/1/get_logo/1`);

      expect(response.status).toBe(401);
    });

    it('should return 404 when image is not found', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_logo/non_existing_image.png`,
      );

      expect(res.status).toBe(404);
    });

    it('should return 200 when image is found', async () => {
      const file = Buffer.from([]);
      const fileName = 'test.png';

      await fs.writeFileSync(
        `${process.env.UPLOAD_LOCATION}/${fileName}`,
        file,
      );

      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create({
        logoUrl: fileName,
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).get(
        `/organization/${organization.id}/get_logo/${organization.logoUrl}`,
      );

      expect(res.status).toBe(200);

      await fs.unlinkSync(path.join(process.env.UPLOAD_LOCATION, fileName));
    });
  });

  describe('PATCH /organization/:oid/update_account_access/:uid', () => {
    it('should return 401 when user is not logged in', async () => {
      const response = await supertest().patch(
        `/organization/1/update_account_access/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when is not admin', async () => {
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
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: user.id,
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
        `/organization/${organization.id}/update_account_access/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
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

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update_account_access/${userTwo.id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('User account access updated');
    });
  });

  describe('PATCH /organization/:oid/update', () => {
    it('should return 401 when user is not logged in', async () => {
      const response = await supertest().patch(`/organization/1/update`);

      expect(response.status).toBe(401);
    });

    it('should return 401 when is not admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).patch(
        `/organization/${organization.id}/update`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 400 when organization name is too short', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update`)
        .send({
          name: '        ',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        'Organization name must be at least 3 characters',
      );
    });

    it('should return 400 when organization description is too short', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update`)
        .send({
          name: 'test',
          description: '        ',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        'Organization description must be at least 10 characters',
      );
    });

    it('should return 400 when organization website URL is too short', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create({
        websiteUrl: 'http://ubc.ca',
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update`)
        .send({
          name: 'test',
          description: 'Organization description with 10 characters',
          websiteUrl: '        ',
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        'Organization URL must be at least 4 characters and be a valid URL',
      );
    });

    it('should return 200 when organization is updated', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create({
        websiteUrl: 'http://ubc.ca',
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .patch(`/organization/${organization.id}/update`)
        .send({
          name: 'test',
          description: 'Organization description with 10 characters',
          websiteUrl: 'https://okanagan.ubc.ca',
        });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Organization updated');
    });
  });

  describe('DELETE /organization/:oid/drop_user_courses/:uid', () => {
    it('should return 401 when user is not logged in', async () => {
      const response = await supertest().delete(
        `/organization/1/drop_user_courses/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when is not admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/drop_user_courses/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 400 when body userCourses is empty', async () => {
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

      const res = await supertest({ userId: user.id })
        .delete(
          `/organization/${organization.id}/drop_user_courses/${userTwo.id}`,
        )
        .send([]);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("User doesn't have any courses to delete");
    });

    it('should return 401 when user to update is organization admin', async () => {
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
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .delete(
          `/organization/${organization.id}/drop_user_courses/${userTwo.id}`,
        )
        .send([course.id]);

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to update is global admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create({
        userRole: UserRole.ADMIN,
      });
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
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .delete(
          `/organization/${organization.id}/drop_user_courses/${userTwo.id}`,
        )
        .send([course.id]);

      expect(res.status).toBe(401);
    });

    it('should return 200 when user courses are deleted', async () => {
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
      }).save();

      await OrganizationCourseModel.create({
        courseId: course.id,
        organizationId: organization.id,
      }).save();

      await UserCourseModel.create({
        userId: userTwo.id,
        courseId: course.id,
      }).save();

      const res = await supertest({ userId: user.id })
        .delete(
          `/organization/${organization.id}/drop_user_courses/${userTwo.id}`,
        )
        .send([course.id]);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('User courses deleted');
    });
  });

  describe('DELETE /organization/:oid/delete_profile_picture/:uid', () => {
    it('should return 401 when user is not logged in', async () => {
      const response = await supertest().delete(
        `/organization/1/delete_profile_picture/1`,
      );

      expect(response.status).toBe(401);
    });

    it('should return 401 when is not admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/delete_profile_picture/1`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 401 when user to update is organization admin', async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: userTwo.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/delete_profile_picture/${userTwo.id}`,
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

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/delete_profile_picture/${userTwo.id}`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 400 when user has no profile picture', async () => {
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

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/delete_profile_picture/${userTwo.id}`,
      );

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("User doesn't have a profile picture");
    });

    it("should return 500 when user profile picture doesn't exist", async () => {
      const user = await UserFactory.create();
      const userTwo = await UserFactory.create({
        photoURL: 'non_existing_photo_url',
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

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/delete_profile_picture/${userTwo.id}`,
      );

      expect(res.status).toBe(500);
      expect(res.body.message).toBe(
        `Error deleting previous picture at : non_existing_photo_url the previous image was at an invalid location?`,
      );
    });

    it('should return 200 when user profile picture is deleted', async () => {
      const file = Buffer.from([]);
      const fileName = 'test.png';

      await fs.writeFileSync(
        `${process.env.UPLOAD_LOCATION}/${fileName}`,
        file,
      );

      const user = await UserFactory.create();
      const userTwo = await UserFactory.create({
        photoURL: fileName,
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

      const res = await supertest({ userId: user.id }).delete(
        `/organization/${organization.id}/delete_profile_picture/${userTwo.id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Profile picture deleted');
    });
  });

  describe('POST /organization/:oid/upload_logo', () => {
    it('should return 401 when user is not logged in', async () => {
      const res = await supertest().post('/organization/1/upload_logo');

      expect(res.status).toBe(401);
    });

    it('should return 401 when user is not admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).post(
        `/organization/${organization.id}/upload_logo`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when existing logo is delete and logo is uploaded', async () => {
      const file = Buffer.from([]);
      const fileName = 'test.png';

      await fs.writeFileSync(
        `${process.env.UPLOAD_LOCATION}/${fileName}`,
        file,
      );

      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create({
        logoUrl: fileName,
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .post(`/organization/${organization.id}/upload_logo`)
        .attach('file', path.join(__dirname, 'fixtures/images/test.png'));

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logo uploaded');

      await fs.unlinkSync(
        path.join(process.env.UPLOAD_LOCATION, res.body.fileName),
      );
    });

    it('should return 200 when logo is uploaded', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .post(`/organization/${organization.id}/upload_logo`)
        .attach('file', path.join(__dirname, 'fixtures/images/test.png'));

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logo uploaded');

      await fs.unlinkSync(
        path.join(process.env.UPLOAD_LOCATION, res.body.fileName),
      );
    });
  });

  describe('POST /organization/:oid/upload_banner', () => {
    it('should return 401 when user is not logged in', async () => {
      const res = await supertest().post('/organization/1/upload_banner');

      expect(res.status).toBe(401);
    });

    it('should return 401 when user is not admin', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      const res = await supertest({ userId: user.id }).post(
        `/organization/${organization.id}/upload_banner`,
      );

      expect(res.status).toBe(401);
    });

    it('should return 200 when existing banner is delete and banner is uploaded', async () => {
      const file = Buffer.from([]);
      const fileName = 'test.png';

      await fs.writeFileSync(
        `${process.env.UPLOAD_LOCATION}/${fileName}`,
        file,
      );

      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create({
        bannerUrl: fileName,
      });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .post(`/organization/${organization.id}/upload_banner`)
        .attach('file', path.join(__dirname, 'fixtures/images/test.png'));

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Banner uploaded');

      await fs.unlinkSync(
        path.join(process.env.UPLOAD_LOCATION, res.body.fileName),
      );
    });

    it('should return 200 when banner is uploaded', async () => {
      const user = await UserFactory.create();
      const organization = await OrganizationFactory.create();

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
        role: OrganizationRole.ADMIN,
      }).save();

      const res = await supertest({ userId: user.id })
        .post(`/organization/${organization.id}/upload_banner`)
        .attach('file', path.join(__dirname, 'fixtures/images/test.png'));

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Banner uploaded');

      await fs.unlinkSync(
        path.join(process.env.UPLOAD_LOCATION, res.body.fileName),
      );
    });
  });
});
