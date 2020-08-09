import { setupIntegrationTest } from './util/testUtils';
import { LoginModule } from '../src/login/login.module';
import { TestingModuleBuilder } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../src/profile/user.entity';

const mockJWT = {
  signAsync: async (payload, options?) => JSON.stringify(payload),
  verifyAsync: async (payload) => JSON.parse(payload).token !== 'INVALID_TOKEN',
  decode: async (payload) => JSON.parse(payload),
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

      expect(res.header['location']).toBe('/');
      expect(res.get('Set-Cookie')[0]).toContain('userId');
    });

    it('request to entry with invalid jwt returns error', async () => {
      const token = await mockJWT.signAsync({ token: 'INVALID_TOKEN' });

      const res = await supertest()
        .get(`/login/entry?token=${token}`)
        .expect(401);
    });
  });

  describe('POST /khoury_login', () => {
    it('Posting to khoury login sends back the correct redirect', async () => {
      const res = await supertest()
        .post('/khoury_login')
        .send({
          username: 'mr_stenzel',
          email: 'stenzel.w@northeastern.edu',
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [
            {
              course_name: 'Object Oriented Design',
              withdraw: false,
              semester: 657,
            },
          ],
          ta_courses: [
            {
              course_name: 'Fundies 1',
              withdraw: false,
              semester: 657,
            },
          ],
        });

      expect(res.body).toEqual({
        redirect: 'http://localhost:3000/api/v1/login/entry?token={"userId":1}',
      });
    });

    it('Making request creates a new user', async () => {
      const user = await UserModel.findOne({
        where: { username: 'mr_stenzel' },
      });
      expect(user).toBeUndefined();

      const res = await supertest()
        .post('/khoury_login')
        .send({
          username: 'mr_stenzel',
          email: 'stenzel.w@northeastern.edu',
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [
            {
              course_name: 'Object Oriented Design',
              withdraw: false,
              semester: 657,
            },
            {
              course_name: 'Systems',
              withdraw: true,
              semester: 657,
            },
          ],
          ta_courses: [],
        })
        .expect(201);

      const newUser = await UserModel.findOne({
        where: { username: 'mr_stenzel' },
        relations: ['courses'],
      });
      expect(newUser).toBeDefined();

      // Expect that only the courses that have not been withdrawn are saved to the user
      expect(newUser.courses).toHaveLength(1);
    });
  });
});
