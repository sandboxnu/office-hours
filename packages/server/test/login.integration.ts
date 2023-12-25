import { JwtService } from '@nestjs/jwt';
import { TestingModuleBuilder } from '@nestjs/testing';
import { LoginModule } from '../src/login/login.module';
import {
  OrganizationFactory,
  UserCourseFactory,
  UserFactory,
} from './util/factories';
import { setupIntegrationTest } from './util/testUtils';
import * as bcrypt from 'bcrypt';
import { OrganizationUserModel } from 'organization/organization-user.entity';

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

  describe('POST /ubc_login', () => {
    it('returns 400 if no email is provided', async () => {
      await supertest()
        .post('/ubc_login')
        .send({ password: 'fake_password' })
        .expect(400);
    });

    it('returns 404 if user not found', async () => {
      await supertest()
        .post('/ubc_login')
        .send({ email: 'fake_email@ubc.ca', password: 'fake_password' })
        .expect(404);
    });

    it('returns 401 if password is incorrect', async () => {
      const user = await UserFactory.create({ password: 'real_password' });
      await mockJWT.signAsync({ userId: user.id });

      await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'invalid_password' })
        .expect(401);
    });

    it('returns 403 if account is deactivated', async () => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('realpassword', salt);

      const user = await UserFactory.create({
        password: password,
        accountDeactivated: true,
      });
      await mockJWT.signAsync({ userId: user.id });

      await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'realpassword' })
        .expect(403);
    });

    it('returns 200 if password is correct', async () => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('realpassword', salt);

      const user = await UserFactory.create({ password: password });
      await mockJWT.signAsync({ userId: user.id });

      const res = await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'realpassword' });

      expect(res.body).toMatchSnapshot();
      expect(res.status).toBe(200);
    });
  });

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

  describe('POST /ubc_login', () => {
    it('returns 400 if no email is provided', async () => {
      await supertest()
        .post('/ubc_login')
        .send({ password: 'fake_password' })
        .expect(400);
    });

    it('returns 404 if user not found', async () => {
      await supertest()
        .post('/ubc_login')
        .send({ email: 'fake_email@ubc.ca', password: 'fake_password' })
        .expect(404);
    });

    it('returns 401 if password is incorrect', async () => {
      const user = await UserFactory.create({ password: 'real_password' });
      await mockJWT.signAsync({ userId: user.id });

      await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'invalid_password' })
        .expect(401);
    });

    it('returns 401 when organization does not allow legacy auth', async () => {
      const organization = await OrganizationFactory.create({
        legacyAuthEnabled: false,
      });
      const user = await UserFactory.create({ password: 'real_password' });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await mockJWT.signAsync({ userId: user.id });

      await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'real_password' })
        .expect(401);
    });

    it('returns 401 when user did not sign up with legacy account system', async () => {
      const organization = await OrganizationFactory.create({
        legacyAuthEnabled: false,
      });
      const user = await UserFactory.create({ password: null });

      await OrganizationUserModel.create({
        userId: user.id,
        organizationId: organization.id,
      }).save();

      await mockJWT.signAsync({ userId: user.id });

      await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'real_password' })
        .expect(401);
    });

    it('returns 200 if password is correct', async () => {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('realpassword', salt);

      const user = await UserFactory.create({ password: password });
      await mockJWT.signAsync({ userId: user.id });

      const res = await supertest()
        .post('/ubc_login')
        .send({ email: user.email, password: 'realpassword' });

      expect(res.body).toMatchSnapshot();
      expect(res.status).toBe(200);
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
