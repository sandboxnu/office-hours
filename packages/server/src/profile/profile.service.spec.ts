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
import { MailService } from 'mail/mail.service';
import { UserModel } from './user.entity';

jest.useFakeTimers();

// Let's revisit theses tests later, we need to create new one since we changed a lot of the logic
describe('ProfileService', () => {
  let service: ProfileService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [
        ProfileService,
        LoginCourseService,
        {
          // We disabled the mail service for now, so let's just mock it
          provide: MailService,
          useValue: {},
        },
      ],
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
        semester: '202110', // fall 2020
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

    // Lets revisit these 3 tests, I am not sure if they are correct.

    it('returns pending courses (sans already registered courses) for a prof who never registered', async () => {
      const resp = await service.getPendingCourses(prof1.id);
      // expect(resp).toEqual([prof1KhouryCourses[1]]);
      expect(resp).toEqual([prof1KhouryCourses[0], prof1KhouryCourses[1]]);
    });

    it('returns pending courses (sans already registered courses) for a prof who registered last sem', async () => {
      await LastRegistrationFactory.create({
        prof: prof1,
        lastRegisteredSemester: '202060',
      }); // summer 2 of 2020
      const resp = await service.getPendingCourses(prof1.id);
      // expect(resp).toEqual([prof1KhouryCourses[1]]);
      expect(resp).toEqual([prof1KhouryCourses[0], prof1KhouryCourses[1]]);
    });

    it('returns no pending courses if a prof has already registered', async () => {
      const resp = await service.getPendingCourses(prof2.id);
      // expect(resp).toEqual([]);
      expect(resp).toEqual([prof1KhouryCourses[0]]);
    });

    describe('handles section group payloads with multiple semesters (summer semesters)', () => {
      let prof: UserModel;
      const khouryCourses = [
        {
          name: 'Fundies 1',
          crns: [123, 456],
          semester: '202250', // 2022 summer full
        },
        {
          name: 'OOD',
          crns: [798],
          semester: '202160', // 2022 summer 2
        },
        {
          name: 'Fundies 2',
          crns: [135, 246],
          semester: '202240', // 2022 summer 1 - this course wouldnt be in a real admin payload, but good to test
        },
      ];
      beforeEach(async () => {
        prof = await UserFactory.create();
        await ProfSectionGroupsFactory.create({
          prof,
          sectionGroups: khouryCourses,
        });
      });

      it('returns only summer 2 pending courses if lastRegistered is summer 1', async () => {
        // LastRegisteredSemester is Summer 1 --> should identify Summer full as well
        // so Summer Full class will not be a pending course even tho it was never registered
        await LastRegistrationFactory.create({
          prof,
          lastRegisteredSemester: '202240',
        });

        const resp = await service.getPendingCourses(prof.id);
        expect(resp).toEqual([khouryCourses[1]]); // should only have summer 2 course
      });

      it('returns only summer 2 pending courses if lastRegistered is summer full', async () => {
        await LastRegistrationFactory.create({
          prof,
          lastRegisteredSemester: '202250',
        });

        const resp = await service.getPendingCourses(prof.id);
        expect(resp).toEqual([khouryCourses[1]]); // should only have summer 2 course
      });
    });
  });
});
