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
import { Role } from '@koh/common';
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
    // page defaults
    const page = 1;
    const pageSize = 10;
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
        courseId: number,
        page: number,
        pageSize: number,
        role?: Role,
        search?: string,
    */
    it('returns nothing for a non-existing course id', async () => {
      const courseId = 3;
      const resp = await service.getUserInfo(courseId, page, pageSize);
      expect(resp).toEqual([]);
    });

    it('returns Danish and Iris for fundies profs', async () => {
      const courseId = 1;
      const prof = Role.PROFESSOR;
      const resp = await service.getUserInfo(courseId, page, pageSize, prof);
      expect(resp.map((info) => info.name)).toEqual([
        'Danish Farooq',
        'Iris Liu',
      ]);
    });
  });
});
