import { SignupModule } from 'signup/signup.module';
import { TestingModuleBuilder } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { setupIntegrationTest } from './util/testUtils';
import { CourseFactory, UserFactory } from './util/factories';

const mockJWT = {
  signAsync: async (payload) => JSON.stringify(payload),
  verifyAsync: async (payload) => JSON.parse(payload).token !== 'INVALID_TOKEN',
  decode: (payload) => JSON.parse(payload),
};

describe('SignUp Integration', () => {
  const supertest = setupIntegrationTest(
    SignupModule,
    (t: TestingModuleBuilder) =>
      t.overrideProvider(JwtService).useValue(mockJWT),
  );

  describe('POST /ubc_signup', () => {
    it('returns 400 when parameters are missing', async () => {
      const res = await supertest().post('/signup/ubc_signup').send({});

      expect(res.status).toBe(400);
    });

    it('returns 409 when user exists', async () => {
      const course = await CourseFactory.create({ name: 'CS 304' });
      const user = await UserFactory.create();

      const res = await supertest().post('/signup/ubc_signup').send({
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: 'random_password',
        selected_course: course.id,
      });
      expect(res.status).toBe(409);
    });

    it('returns 200 when user does not exist', async () => {
      const course = await CourseFactory.create({ name: 'CS 304' });

      const res = await supertest().post('/signup/ubc_signup').send({
        email: 'user@ubc.ca',
        first_name: 'user',
        last_name: 'user',
        password: 'random_password',
        selected_course: course.id,
      });

      expect(res.status).toBe(200);
    });
  });
});
