import { AuthModule } from 'auth/auth.module';
import { setupIntegrationTest } from './util/testUtils';
import { TestingModuleBuilder } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { OrganizationFactory } from './util/factories';
import { AuthService } from 'auth/auth.service';

const mockJWT = {
  signAsync: async (payload) => JSON.stringify(payload),
  verifyAsync: async (payload) => JSON.parse(payload).token !== 'INVALID_TOKEN',
  decode: (payload) => JSON.parse(payload),
};

const mockAuthService = {
  // Needed to mock the AuthService
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginWithGoogle: async (code: string, _organizationId: number) => {
    if (code === 'expectedCode') {
      return 1;
    } else {
      throw new Error('Some error');
    }
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
