/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthModule } from 'auth/auth.module';
import { setupIntegrationTest } from './util/testUtils';
import { TestingModuleBuilder } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { OrganizationFactory, UserFactory } from './util/factories';
import { AuthService } from 'auth/auth.service';
import { AccountType } from '@koh/common';

const mockJWT = {
  signAsync: async (payload) => JSON.stringify(payload),
  verifyAsync: async (payload) => JSON.parse(payload).token !== 'INVALID_TOKEN',
  decode: (payload) => JSON.parse(payload),
};

const mockAuthService = {
  // Needed to mock the AuthService
  loginWithGoogle: async (code: string, _organizationId: number) => {
    if (code === 'expectedCode') {
      return 1;
    } else {
      throw new Error('Some error');
    }
  },

  loginWithShibboleth: async (
    mail: string,
    _role: string,
    _givenName: string,
    _lastName: string,
    _organizationId: number,
  ): Promise<number> => {
    if (mail == 'failing_email@ubc.ca') {
      throw new Error('Some error');
    }
    return 1;
  },
};

describe('Auth Integration', () => {
  const supertest = setupIntegrationTest(
    AuthModule,
    (t: TestingModuleBuilder) =>
      t
        .overrideProvider(JwtService)
        .useValue(mockJWT)
        .overrideProvider(AuthService)
        .useValue(mockAuthService),
  );

  describe('GET link/:method/:oid', () => {
    it('should return 200 and redirect to google', async () => {
      const res = await supertest().get('/auth/link/google/1');

      expect(res.status).toBe(200);
      expect(res.get('Set-Cookie')[0]).toContain('organization.id=1;');
    });
  });

  describe('GET shibboleth/:oid', () => {
    it("should redirect to auth/failed/40000 when organization doesn't exist", async () => {
      const res = await supertest().get('/auth/shibboleth/0');
      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/auth/failed/40000');
    });

    it('should redirect to auth/failed/40002 when SSO is disabled', async () => {
      const organization = await OrganizationFactory.create({
        ssoEnabled: false,
      });
      const res = await supertest().get(`/auth/shibboleth/${organization.id}`);

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/auth/failed/40002');
    });

    it('should redirect to auth/failed/40001 when headers are missing', async () => {
      const organization = await OrganizationFactory.create({
        ssoEnabled: true,
      });
      const res = await supertest().get(`/auth/shibboleth/${organization.id}`);

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/auth/failed/40001');
    });

    it('should redirect to auth/failed/40001 when authService failed', async () => {
      const organization = await OrganizationFactory.create({
        ssoEnabled: true,
      });

      const res = await supertest()
        .get(`/auth/shibboleth/${organization.id}`)
        .set('x-trust-auth-uid', '1')
        .set('x-trust-auth-mail', 'failing_email@ubc.ca')
        .set('x-trust-auth-role', 'student@ubc.ca')
        .set('x-trust-auth-givenname', 'John')
        .set('x-trust-auth-lastname', 'Doe');

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/auth/failed/40001');
    });

    it('should sign in user when authService succeeded', async () => {
      const organization = await OrganizationFactory.create({
        ssoEnabled: true,
      });
      await UserFactory.create({
        email: 'mocked_email@ubc.ca',
        accountType: AccountType.GOOGLE,
      });
      const res = await supertest()
        .get(`/auth/shibboleth/${organization.id}`)
        .set('x-trust-auth-uid', '1')
        .set('x-trust-auth-mail', 'mocked_email@ubc.ca')
        .set('x-trust-auth-role', 'student@ubc.ca')
        .set('x-trust-auth-givenname', 'John')
        .set('x-trust-auth-lastname', 'Doe');

      await mockAuthService.loginWithShibboleth(
        'mocked_email@ubc.ca',
        'student@ubc.ca',
        'John',
        'Doe',
        organization.id,
      );

      await mockJWT.signAsync({ userId: 1 });

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/courses');
    });
  });

  describe('GET callback/:method', () => {
    it('should redirect to /auth/failed/40000 when cookie is missing', async () => {
      const res = await supertest().get('/auth/callback/google');

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/auth/failed/40000');
    });

    it('should redirect to /auth/failed/40001 when authService failed', async () => {
      const res = await supertest()
        .get('/auth/callback/google')
        .set('Cookie', 'organization.id=1');

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/auth/failed/40001');
    });

    it('should sign in user when authService succeeded', async () => {
      const organization = await OrganizationFactory.create();
      const res = await supertest()
        .get('/auth/callback/google')
        .set('Cookie', `organization.id=${organization.id}`)
        .query({ code: 'expectedCode' });

      await mockAuthService.loginWithGoogle('expectedCode', organization.id);
      await mockJWT.signAsync({ userId: 1 });

      expect(res.status).toBe(302);
      expect(res.header['location']).toBe('/courses');
    });
  });
});
