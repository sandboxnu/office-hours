import { TestingModule, Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import {
  UserFactory,
  UserCourseFactory,
  CourseFactory,
} from '../../test/util/factories';
import { TestTypeOrmModule, TestConfigModule } from '../../test/util/testUtils';
import { CourseService } from './course.service';
import { UserModel } from 'profile/user.entity';
import { CourseModel } from './course.entity';
import { Role, UserPartial } from '@koh/common';
import { LoginCourseService } from 'login/login-course.service';

describe('CourseService', () => {
  let service: CourseService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [CourseService, LoginCourseService],
    }).compile();

    service = module.get<CourseService>(CourseService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('getUserInfo', () => {
    let profDanish: UserModel;
    let profIris: UserModel;
    let vera: UserModel;
    let tingwei: UserModel;
    let neel: UserModel;
    let sumit: UserModel;
    let angela: UserModel;
    let fundies1: CourseModel;
    let algo: CourseModel;
    // param defaults
    let page = 1;
    let pageSize = 10;
    let search = '';
    beforeEach(async () => {
      // Initialize courses
      fundies1 = await CourseFactory.create({
        name: 'Fundies 1',
      });
      algo = await CourseFactory.create({
        name: 'Algo',
      });
      // Initialize Danish as professor in both courses
      profDanish = await UserFactory.create({
        firstName: 'Danish',
        lastName: 'Farooq',
        email: 'dfarooq@northeastern.edu',
      });
      await UserCourseFactory.create({
        user: profDanish,
        course: fundies1,
        role: Role.PROFESSOR,
      });
      await UserCourseFactory.create({
        user: profDanish,
        course: algo,
        role: Role.PROFESSOR,
      });
      // Initialize Iris as professor in only fundies
      profIris = await UserFactory.create({
        firstName: 'Iris',
        lastName: 'Liu',
        email: 'iliu@northeastern.edu',
      });
      await UserCourseFactory.create({
        user: profIris,
        course: fundies1,
        role: Role.PROFESSOR,
      });
      // Initialize Vera as TA in both courses
      vera = await UserFactory.create({
        firstName: 'Vera',
        lastName: 'Kong',
        email: 'vkong@northeastern.edu',
      });
      await UserCourseFactory.create({
        user: vera,
        course: fundies1,
        role: Role.TA,
      });
      await UserCourseFactory.create({
        user: vera,
        course: algo,
        role: Role.TA,
      });
      // Initialize Tingwei as TA in fundies and student in algo
      tingwei = await UserFactory.create({
        firstName: 'Tingwei',
        lastName: 'Shi',
        email: 'tshi@northeastern.edu',
        photoURL:
          'https://files.slack.com/files-pri/TE565NU79-F02K81U7S13/image_from_ios.jpg',
      });
      await UserCourseFactory.create({
        user: tingwei,
        course: fundies1,
        role: Role.TA,
      });
      await UserCourseFactory.create({
        user: tingwei,
        course: algo,
        role: Role.STUDENT,
      });
      // Initialize Neel as TA in fundies and not in algo
      neel = await UserFactory.create({
        firstName: 'Neel',
        lastName: 'Bhalla',
        email: 'nbhalla@northeastern.edu',
      });
      await UserCourseFactory.create({
        user: neel,
        course: fundies1,
        role: Role.TA,
      });
      // Initialize Sumit as student in both
      sumit = await UserFactory.create({
        firstName: 'Sumit',
        lastName: 'De',
        email: 'sde@northeastern.edu',
      });
      await UserCourseFactory.create({
        user: sumit,
        course: fundies1,
        role: Role.STUDENT,
      });
      await UserCourseFactory.create({
        user: sumit,
        course: algo,
        role: Role.STUDENT,
      });
      // Initialize Angela as student in only fundies
      angela = await UserFactory.create({
        firstName: 'Angela',
        lastName: 'Zheng',
        email: 'azheng@northeastern.edu',
      });
      await UserCourseFactory.create({
        user: angela,
        course: fundies1,
        role: Role.STUDENT,
      });
    });

    /*
        Fundies:
          profs - danish, iris
          tas - vera, tingwei, neel
          students - sumit, angela

        Algo:
          profs - danish
          tas - vera
          students - sumit, tingwei
    */

    it('returns nothing for a non-existing course id', async () => {
      const courseId = 3;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp.users).toEqual([]);
    });

    it('returns everyone for fundies, no role, no search term', async () => {
      const courseId = 1;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp.users.map((info) => info.name)).toEqual([
        'Angela Zheng',
        'Danish Farooq',
        'Iris Liu',
        'Neel Bhalla',
        'Sumit De',
        'Tingwei Shi',
        'Vera Kong',
      ]);
    });

    it('returns all professors for fundies', async () => {
      const courseId = 1;
      const role = Role.PROFESSOR;
      const resp = await service.getUserInfo(
        courseId,
        page,
        pageSize,
        search,
        role,
      );
      expect(resp.users.map((info) => info.name)).toEqual([
        'Danish Farooq',
        'Iris Liu',
      ]);
    });

    it('returns all tas for fundies', async () => {
      const courseId = 1;
      const role = Role.TA;
      const resp = await service.getUserInfo(
        courseId,
        page,
        pageSize,
        search,
        role,
      );
      expect(resp.users.map((info) => info.name)).toEqual([
        'Neel Bhalla',
        'Tingwei Shi',
        'Vera Kong',
      ]);
    });

    it('returns all students for fundies', async () => {
      const courseId = 1;
      const role = Role.STUDENT;
      const resp = await service.getUserInfo(
        courseId,
        page,
        pageSize,
        search,
        role,
      );
      expect(resp.users.map((info) => info.name)).toEqual([
        'Angela Zheng',
        'Sumit De',
      ]);
    });

    it('returns all professors for algo', async () => {
      const courseId = 2;
      const role = Role.PROFESSOR;
      const resp = await service.getUserInfo(
        courseId,
        page,
        pageSize,
        search,
        role,
      );
      expect(resp.users.map((info) => info.name)).toEqual(['Danish Farooq']);
    });

    it('returns all tas for algo', async () => {
      const courseId = 2;
      const role = Role.TA;
      const resp = await service.getUserInfo(
        courseId,
        page,
        pageSize,
        search,
        role,
      );
      expect(resp.users.map((info) => info.name)).toEqual(['Vera Kong']);
    });

    it('returns all students for algo', async () => {
      const courseId = 2;
      const role = Role.STUDENT;
      const resp = await service.getUserInfo(
        courseId,
        page,
        pageSize,
        search,
        role,
      );
      expect(resp.users.map((info) => info.name)).toEqual([
        'Sumit De',
        'Tingwei Shi',
      ]);
    });

    it('returns name, email, and photoURL for user', async () => {
      const courseId = 1;
      search = 'tingwei';
      const user = (await service.getUserInfo(courseId, page, pageSize, search))
        .users[0] as UserPartial;
      expect(user.name).toEqual('Tingwei Shi');
      expect(user.email).toEqual('tshi@northeastern.edu');
      expect(user.photoURL).toEqual(
        'https://files.slack.com/files-pri/TE565NU79-F02K81U7S13/image_from_ios.jpg',
      );
    });

    it('returns danish when search term is danish', async () => {
      const courseId = 1;
      const role = Role.PROFESSOR;
      search = 'danish';
      const user = (
        await await service.getUserInfo(courseId, page, pageSize, search, role)
      ).users[0] as UserPartial;
      expect(user.name).toEqual('Danish Farooq');
    });

    it('returns danish when search term is farooq', async () => {
      const courseId = 1;
      const role = Role.PROFESSOR;
      search = 'farooq';
      const user = (
        await await service.getUserInfo(courseId, page, pageSize, search, role)
      ).users[0] as UserPartial;
      expect(user.name).toEqual('Danish Farooq');
    });

    it('returns danish when search term is the whole name', async () => {
      const courseId = 1;
      const role = Role.PROFESSOR;
      search = 'Danish Farooq';
      const user = (
        await service.getUserInfo(courseId, page, pageSize, search, role)
      ).users[0] as UserPartial;
      expect(user.name).toEqual('Danish Farooq');
    });

    it('returns danish and sumit when search term is d', async () => {
      const courseId = 1;
      search = 'd';
      const resp = await service.getUserInfo(courseId, page, pageSize, search);
      expect(resp.users.map((info) => info.name)).toEqual([
        'Danish Farooq',
        'Sumit De',
      ]);
    });

    it('returns first three users for fundies when page size is 3', async () => {
      const courseId = 1;
      pageSize = 3;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp.users.map((info) => info.name)).toEqual([
        'Angela Zheng',
        'Danish Farooq',
        'Iris Liu',
      ]);
    });

    it('returns second three users for fundies when page size is 3 and page is 2', async () => {
      const courseId = 1;
      pageSize = 3;
      page = 2;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp.users.map((info) => info.name)).toEqual([
        'Neel Bhalla',
        'Sumit De',
        'Tingwei Shi',
      ]);
    });

    it('returns last user for fundies when page size is 3 and page is 3', async () => {
      const courseId = 1;
      pageSize = 3;
      page = 3;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp.users.map((info) => info.name)).toEqual(['Vera Kong']);
    });

    it('returns no users for fundies when page size is 3 and page is out of bounds', async () => {
      const courseId = 1;
      pageSize = 3;
      page = 4;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp.users.map((info) => info.name)).toEqual([]);
    });
  });

  describe('addStudentToCourse', () => {
    it('returns true when student added to course', async () => {
      const user = await UserFactory.create({ courses: [] });
      const course = await CourseFactory.create();

      const resp = await service.addStudentToCourse(course, user);

      expect(resp).toEqual(true);
    });

    it('returns false when student already in course', async () => {
      const user = await UserFactory.create();
      const course = await CourseFactory.create();

      const resp = await service.addStudentToCourse(course, user);

      expect(resp).toEqual(false);
    });
  });
});
