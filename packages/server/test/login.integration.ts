import { JwtService } from '@nestjs/jwt';
import { TestingModuleBuilder } from '@nestjs/testing';
import { LoginModule } from '../src/login/login.module';
import { UserCourseFactory, UserFactory } from './util/factories';
import { setupIntegrationTest } from './util/testUtils';

const mockJWT = {
  signAsync: async (payload) => JSON.stringify(payload),
  verifyAsync: async (payload) => JSON.parse(payload).token !== 'INVALID_TOKEN',
  decode: (payload) => JSON.parse(payload),
};

describe('Login Integration', () => {
  const supertest = setupIntegrationTest(
    LoginModule,
    (t: TestingModuleBuilder) =>
      t.overrideProvider(JwtService).useValue(mockJWT),
  );

  describe('POST /login/entry', () => {
    it('request to entry with correct jwt payload works', async () => {
      const token = await mockJWT.signAsync({ userId: 1 });

      const res = await supertest()
        .get(`/login/entry?token=${token}`)
        .expect(302);

      expect(res.header['location']).toBe('/courses');
      expect(res.get('Set-Cookie')[0]).toContain('userId');
    });

    it('entry as user with courses goes to root page', async () => {
      const user = await UserFactory.create();
      await UserCourseFactory.create({ user: user });
      const token = await mockJWT.signAsync({ userId: user.id });

      const res = await supertest()
        .get(`/login/entry?token=${token}`)
        .expect(302);

      expect(res.header['location']).toBe('/courses');
      expect(res.get('Set-Cookie')[0]).toContain('userId');
    });

    it('request to entry with invalid jwt returns error', async () => {
      const token = await mockJWT.signAsync({ token: 'INVALID_TOKEN' });

      await supertest().get(`/login/entry?token=${token}`).expect(401);
    });
  });

  describe('GET /logout', () => {
    it('makes sure logout endpoint is destroying cookies like a mob boss', async () => {
      const res = await supertest().get(`/logout`).expect(302);
      expect(res.header['location']).toBe('/login');
      expect(res.get('Set-Cookie')[0]).toContain('auth_token=;');
    });
  });
});
