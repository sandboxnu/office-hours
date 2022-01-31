import { Role } from '@koh/common';
import { JwtService } from '@nestjs/jwt';
import { TestingModuleBuilder } from '@nestjs/testing';
import { CourseModel } from 'course/course.entity';
import { UserCourseModel } from 'profile/user-course.entity';
import { SemesterModel } from 'semester/semester.entity';
import { LoginModule } from '../src/login/login.module';
import { UserModel } from '../src/profile/user.entity';
import {
  CourseFactory,
  CourseSectionFactory,
  SemesterFactory,
  UserCourseFactory,
  UserFactory,
} from './util/factories';
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

      expect(res.header['location']).toBe('/');
      expect(res.get('Set-Cookie')[0]).toContain('userId');
    });

    it('entry as user with courses goes to root page', async () => {
      const user = await UserFactory.create();
      await UserCourseFactory.create({ user: user });
      const token = await mockJWT.signAsync({ userId: user.id });

      const res = await supertest()
        .get(`/login/entry?token=${token}`)
        .expect(302);

      expect(res.header['location']).toBe('/');
      expect(res.get('Set-Cookie')[0]).toContain('userId');
    });

    it('request to entry with invalid jwt returns error', async () => {
      const token = await mockJWT.signAsync({ token: 'INVALID_TOKEN' });

      await supertest().get(`/login/entry?token=${token}`).expect(401);
    });
  });

  describe('POST /khoury_login', () => {
    it('creates user and sends back correct redirect', async () => {
      const user = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
      });
      expect(user).toBeUndefined();

      const res = await supertest().post('/khoury_login').send({
        email: 'stenzel.w@northeastern.edu',
        campus: 1,
        first_name: 'Will',
        last_name: 'Stenzel',
        photo_url: 'sdf',
        courses: [],
      });

      // Expect that the new user has been created
      const newUser = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
      });
      expect(newUser).toBeDefined();

      // And that the redirect is correct
      expect(res.body).toEqual({
        redirect: `http://localhost:3000/api/v1/login/entry?token={"userId":${newUser.id}}`,
      });
    });

    it('converts husky emails to northeastern emails', async () => {
      const user = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
      });
      expect(user).toBeUndefined();

      await supertest().post('/khoury_login').send({
        email: 'stenzel.w@husky.neu.edu',
        campus: 1,
        first_name: 'Will',
        last_name: 'Stenzel',
        photo_url: 'sdf',
        courses: [],
      });

      // Expect that the new user has been created
      const newUser = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
      });
      expect(newUser).toBeDefined();

      const huskyUser = await UserModel.findOne({
        where: { email: 'stenzel.w@husky.neu.edu' },
      });
      expect(huskyUser).toBeUndefined();
    });

    describe('with course mapping', () => {
      let course;
      let course2;
      let course3;
      beforeEach(async () => {
        // Make course mapping so usercourse can be added
        const semester = await SemesterFactory.create();
        course = await CourseFactory.create({
          name: 'CS 2510 Accelerated',
          semester,
        });
        await CourseSectionFactory.create({
          crn: 23456,
          course: course,
        });
        course2 = await CourseFactory.create({
          name: 'CS 2510',
          semester,
        });
        await CourseSectionFactory.create({
          crn: 34567,
          course: course2,
        });
        course3 = await CourseFactory.create({
          name: 'CS 2500',
          semester,
        });
        await CourseSectionFactory.create({
          crn: 45678,
          course: course3,
        });
      });
      it('overwrites courses but not names of existing users', async () => {
        let user = await UserFactory.create({
          firstName: 'Bill',
          lastName: 'Benzel',
        });

        await supertest()
          .post('/khoury_login')
          .send({
            email: user.email,
            campus: 1,
            first_name: 'Will',
            last_name: 'Stenzel',
            photo_url: 'sdf',
            courses: [
              {
                crn: 23456,
                semester: '202110',
                role: Role.STUDENT,
              },
            ],
          })
          .expect(201);
        user = await UserModel.findOne({
          where: { id: user.id },
          relations: ['courses'],
        });

        expect(user.courses).toHaveLength(1);
        expect(user.firstName).not.toEqual('Will');
      });

      it('handles student courses and sections correctly', async () => {
        await supertest()
          .post('/khoury_login')
          .send({
            email: 'stenzel.w@northeastern.edu',
            campus: 1,
            first_name: 'Will',
            last_name: 'Stenzel',
            photo_url: 'sdf',
            courses: [
              {
                crn: 23456,
                semester: '202110',
                role: Role.STUDENT,
              },
            ],
          })
          .expect(201);

        const student = await UserModel.findOne({
          where: { email: 'stenzel.w@northeastern.edu' },
          relations: ['courses'],
        });

        expect(student.courses).toHaveLength(1);
        expect(student.courses[0].id).toBe(course.id);
      });

      it('deletes stale user course if no longer valid', async () => {
        await supertest()
          .post('/khoury_login')
          .send({
            email: 'stenzel.w@northeastern.edu',
            campus: 1,
            first_name: 'Will',
            last_name: 'Stenzel',
            photo_url: '',
            courses: [
              {
                crn: 23456,
                semester: '202110',
                role: Role.STUDENT,
              },
              {
                crn: 45678,
                semester: '202110',
                role: Role.STUDENT,
              },
            ],
          })
          .expect(201);

        const user = await UserModel.findOne({
          where: { email: 'stenzel.w@northeastern.edu' },
          relations: ['courses'],
        });

        const fundiesUserCourse = await UserCourseModel.findOne({
          where: { user, course },
        });
        expect(fundiesUserCourse).toEqual({
          courseId: 1,
          id: 1,
          override: false,
          role: 'student',
          userId: 1,
          expires: false,
        });

        const totalUserCourses = await UserCourseModel.count();
        expect(totalUserCourses).toEqual(2);

        // After dropping fundies II, user logs in again
        await supertest()
          .post('/khoury_login')
          .send({
            email: 'stenzel.w@northeastern.edu',
            campus: 1,
            first_name: 'Will',
            last_name: 'Stenzel',
            photo_url: '',
            courses: [
              {
                crn: 45678,
                semester: '202110',
                role: Role.STUDENT,
              },
            ],
          })
          .expect(201);

        const noUserCourse = await UserCourseModel.findOne(
          fundiesUserCourse.id,
        );
        expect(noUserCourse).toBeUndefined();

        const totalUserCoursesUpdated = await UserCourseModel.count();
        expect(totalUserCoursesUpdated).toEqual(1);
      });

      it('respects user course overrides', async () => {
        await supertest()
          .post('/khoury_login')
          .send({
            email: 'stenzel.w@northeastern.edu',
            campus: 1,
            first_name: 'Will',
            last_name: 'Stenzel',
            photo_url: '',
            courses: [
              {
                crn: 23456,
                semester: '202110',
                role: Role.STUDENT,
              },
              {
                crn: 34567,
                semester: '202110',
                role: Role.TA,
              },
            ],
          })
          .expect(201);

        expect(await UserCourseModel.count()).toEqual(2);

        const overrideCourse = await UserCourseFactory.create({
          override: true,
        });

        expect(await UserCourseModel.count()).toEqual(3);

        await supertest()
          .post('/khoury_login')
          .send({
            email: 'stenzel.w@northeastern.edu',
            campus: 1,
            first_name: 'Will',
            last_name: 'Stenzel',
            photo_url: '',
            courses: [
              {
                crn: 23456,
                semester: '202110',
                role: Role.STUDENT,
              },
              {
                crn: 34567,
                semester: '202110',
                role: Role.TA,
              },
            ],
          })
          .expect(201);

        const overrideStillExists = await UserCourseModel.findOne(
          overrideCourse.id,
        );
        expect(overrideStillExists).toBeDefined();
        expect(overrideStillExists).toEqual({
          courseId: overrideCourse.courseId,
          id: overrideCourse.id,
          override: overrideCourse.override,
          role: overrideCourse.role,
          userId: overrideCourse.userId,
          expires: false,
        });

        const totalUserCoursesUpdated = await UserCourseModel.count();
        expect(totalUserCoursesUpdated).toEqual(3);
      });

      it('handles new semester with unregistered courses', async () => {
        const sem = await SemesterModel.findOne({
          where: { season: 'Fall', year: 2022 },
        });
        expect(sem).toBeUndefined();

        await supertest()
          .post('/khoury_login')
          .send({
            email: 'liu.i@northeastern.edu',
            campus: 1,
            first_name: 'Iris',
            last_name: 'Liu',
            photo_url: 'sdf',
            courses: [
              {
                crns: [23456],
                semester: '202310', // 2022 fall
                name: 'Fundies 2 Accel',
              },
            ],
          })
          .expect(201);

        const prof = await UserModel.findOne({
          where: { email: 'liu.i@northeastern.edu' },
          relations: ['courses'],
        });

        expect(prof.courses).toHaveLength(0); // Does not create user courses

        const newSem = await SemesterModel.findOne({
          where: { season: 'Fall', year: 2022 },
        });
        expect(newSem).toBeDefined();
      });
    });

    const setupTAAndProfessorCourses = async () => {
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
        crn: 98765,
        course: regularFundies,
      });
      await CourseSectionFactory.create({
        crn: 13345,
        course: regularFundies,
      });
      await CourseSectionFactory.create({
        crn: 87654,
        course: acceleratedFundies,
      });
      await CourseSectionFactory.create({
        crn: 76543,
        course: onlineFundies,
      });
    };

    it('handles TA courses correctly', async () => {
      await setupTAAndProfessorCourses();

      await supertest()
        .post('/khoury_login')
        .send({
          email: 'stenzel.w@northeastern.edu',
          campus: 1,
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [
            {
              crn: 98765,
              semester: '202110',
              role: 'TA',
            },
          ],
        })
        .expect(201);

      const ta = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
        relations: ['courses'],
      });

      const fundiesRegular = await CourseModel.findOne({
        name: 'CS 2500 Regular',
      });

      expect(ta.courses).toHaveLength(1);
      expect(ta.courses[0]).toEqual({
        courseId: fundiesRegular.id,
        id: 1,
        override: false,
        role: 'ta',
        userId: ta.id,
        expires: false,
      });
    });

    it('handles professor courses correctly', async () => {
      await setupTAAndProfessorCourses();

      await supertest()
        .post('/khoury_login')
        .send({
          email: 'stenzel.w@northeastern.edu',
          campus: 1,
          first_name: 'Will',
          last_name: 'Stenzel',
          photo_url: 'sdf',
          courses: [
            {
              crns: [13345, 98765],
              semester: '202110',
              name: "Prof Li's Office Hours",
            },
          ],
        })
        .expect(201);

      const professor = await UserModel.findOne({
        where: { email: 'stenzel.w@northeastern.edu' },
        relations: ['courses'],
      });

      const ucms = await UserCourseModel.find({
        where: { user: professor },
      });

      expect(professor.courses).toHaveLength(1);
      expect(ucms.every((ucm) => ucm.role === Role.PROFESSOR)).toBeTruthy();
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
