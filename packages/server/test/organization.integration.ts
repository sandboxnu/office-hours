import { OrganizationModule } from 'organization/organization.module';
import { setupIntegrationTest } from './util/testUtils';
import { OrganizationFactory, UserFactory } from './util/factories';

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
  });
});
