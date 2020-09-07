import { setupIntegrationTest } from './util/testUtils';
import { LoginModule } from '../src/login/login.module';
import { TestingModuleBuilder } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../src/profile/user.entity';
import {
  UserFactory,
  UserCourseFactory,
  CourseFactory,
  CourseSectionFactory,
} from './util/factories';

const mockJWT = {
  signAsync: async (payload, options?) => JSON.stringify(payload),
  verifyAsync: async payload => JSON.parse(payload).token !== 'INVALID_TOKEN',
  decode: payload => JSON.parse(payload),
};

describe('Login Integration', () => {
  const supertest = setupIntegrationTest(
    LoginModule,
    (t: TestingModuleBuilder) =>
      t
        .overrideProvider(JwtService)
        .useValue(mockJWT)
  );

  describe('POST /login/entry', () => {
    it('request to entry with correct jwt payload works', async () => {
      const token = await mockJWT.signAsync({ userId: 1 });

      const res = await supertest()
        .get(`/login/entry?token=${token}`)
        .expect(302);

      expect(res.header['location']).toBe('/nocourses');
      expect(res.get('Set-Cookie')[0]).toContain('userId');
    });

    it('entry as user with courses goes to today page', async () => {
      const user = await UserFactory.create();
      const usercourse = await UserCourseFactory.create({ user: user });
      const token = await mockJWT.signAsync({ userId: user.id });

      const res = await supertest()
        .get(`/login/entry?token=${token}`)
        .expect(302);

      expect(res.header['location']).toBe(
        `/course/${usercourse.courseId}/today`,
      );
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
    it('creates user and sends back correct redirect', async () => {
      const user = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
      });
      expect(user).toBeUndefined();

      const res = await supertest()
        .post('/khoury_login')
        .send({
          email: 'stenzel.w@northeastern.edu',
          campus: 1,
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [],
          ta_courses: [],
        });

      // Expect that the new user has been created
      const newUser = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
      });
      expect(newUser).toBeDefined();

      // And that the redirect is correct
      expect(res.body).toEqual({
        redirect: 'http://localhost:3000/api/v1/login/entry?token={"userId":1}',
      });
    });

    it('handles student courses and sections correctly', async () => {
      // This is needed since only courses already in the db will be added as UserCourses
      const course = await CourseFactory.create({
        name: 'CS 2510 Accelerated',
      });
      await CourseSectionFactory.create({
        genericCourseName: 'CS 2510',
        section: 1,
        course: course,
      });

      const res = await supertest()
        .post('/khoury_login')
        .send({
          email: 'stenzel.w@northeastern.edu',
          campus: 1,
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [
            {
              course: 'CS 2510',
              crn: 12345,
              accelerated: false,
              section: 1,
              semester: '000',
              title: 'Fundamentals of Computer Science II',
            },
          ],
          ta_courses: [],
        });

      const student = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
        relations: ['courses'],
      });

      expect(student.courses).toHaveLength(1);
      expect(student.courses[0].id).toBe(course.id);
    });

    it('handles TA courses correctly', async () => {
      const regularFundies = await CourseFactory.create({
        name: 'CS 2500 Regular',
      });
      const acceleratedFundies = await CourseFactory.create({
        name: 'CS 2500 Accelerated',
      });
      const onlineFundies = await CourseFactory.create({
        name: 'CS 2500 Online',
      });
      await CourseSectionFactory.create({
        genericCourseName: 'CS 2500',
        section: 1,
        course: regularFundies,
      });
      await CourseSectionFactory.create({
        genericCourseName: 'CS 2500',
        section: 3,
        course: acceleratedFundies,
      });
      await CourseSectionFactory.create({
        genericCourseName: 'CS 2500',
        section: 2,
        course: onlineFundies,
      });

      const res = await supertest()
        .post('/khoury_login')
        .send({
          email: 'stenzel.w@northeastern.edu',
          campus: 1,
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [],
          ta_courses: [
            {
              course: 'CS 2500',
              semester: '000',
            },
          ],
        })
        .expect(201);

      const ta = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
        relations: ['courses'],
      });

      // Expect the ta to have been all three courses accosiated with the given generic courses (CS 2500)
      expect(ta.courses).toHaveLength(3);
    });
  });
});
