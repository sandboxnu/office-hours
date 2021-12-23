import { TestingModule, Test } from '@nestjs/testing';
import { LoginCourseService } from '../login/login-course.service';
import { Connection } from 'typeorm';
import {
  UserFactory,
  CourseFactory,
  LastRegistrationFactory,
  CourseSectionFactory,
  ProfSectionGroupsFactory,
} from '../../test/util/factories';
import { TestTypeOrmModule, TestConfigModule } from '../../test/util/testUtils';
import { ProfileService } from './profile.service';
import { UserModel } from './user.entity';

describe('ProfileService', () => {
  let service: ProfileService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [ProfileService, LoginCourseService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('getPendingCourses', () => {
    let prof1: UserModel;
    let prof2: UserModel;
    const prof1KhouryCourses = [
      {
        name: 'Fundies 1',
        crns: [123, 456],
        semester: '202110',
      },
      {
        name: 'OOD',
        crns: [798],
        semester: '202110',
      },
    ];
    const prof2KhouryCourses = [
      {
        name: 'Fundies 1',
        crns: [123, 456],
        semester: '202110',
      },
    ];

    beforeEach(async () => {
      prof1 = await UserFactory.create();
      prof2 = await UserFactory.create();
      await ProfSectionGroupsFactory.create({
        prof: prof1,
        sectionGroups: prof1KhouryCourses,
      });
      await ProfSectionGroupsFactory.create({
        prof: prof2,
        sectionGroups: prof2KhouryCourses,
      });
      await LastRegistrationFactory.create({ prof: prof2 });
      const fundies1 = await CourseFactory.create();
      await CourseSectionFactory.create({ crn: 123, course: fundies1 });
      await CourseSectionFactory.create({ crn: 456, course: fundies1 });
    });

    it('returns nothing for a non-professor', async () => {
      const student = await UserFactory.create();
      const resp = await service.getPendingCourses(student.id);
      expect(resp).toBeUndefined();
    });

    it('returns pending courses (sans already registered courses) for a prof', async () => {
      const resp = await service.getPendingCourses(prof1.id);
      expect(resp).toEqual([prof1KhouryCourses[1]]);
    });

    it('returns no pending courses if a prof has already registered', async () => {
      const resp = await service.getPendingCourses(prof2.id);
      expect(resp).toEqual([]);
    });
  });
});
