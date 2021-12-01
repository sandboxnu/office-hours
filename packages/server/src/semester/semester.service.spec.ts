import { Connection } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TestTypeOrmModule } from '../../test/util/testUtils';
import { SemesterService } from './semester.service';
import { CourseFactory, SemesterFactory } from '../../test/util/factories';
import { CourseModel } from '../course/course.entity';
import { Season } from '@koh/common';
import { SemesterModel } from './semester.entity';

describe('SemesterService', () => {
  let service: SemesterService;
  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule],
      providers: [SemesterService],
    }).compile();

    service = module.get<SemesterService>(SemesterService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  describe('setSemester', () => {
    beforeEach(async () => {
      await CourseFactory.create({
        semester: await SemesterFactory.create({
          season: 'Fall',
          year: 2020,
        }),
      });
      await CourseFactory.create({
        semester: await SemesterFactory.create({
          season: 'Spring',
          year: 2020,
        }),
      });
      await CourseFactory.create({
        semester: await SemesterFactory.create({
          season: 'Summer_Full',
          year: 2020,
        }),
      });

      await CourseFactory.create({
        semester: await SemesterFactory.create({
          season: 'Summer_1',
          year: 2020,
        }),
      });
      await CourseFactory.create({
        semester: await SemesterFactory.create({
          season: 'Summer_2',
          year: 2020,
        }),
      });

      await CourseFactory.create({
        name: 'f2019 cs2500',
        semester: await SemesterFactory.create({
          season: 'Fall',
          year: 2019,
        }),
      });
    });

    async function getSemester(sea: Season, year: number) {
      return await SemesterModel.findOne({
        season: sea,
        year: year,
      });
    }

    it('setSemester disables courses when false ', async () => {
      const target = await getSemester('Fall', 2019);

      await service.toggleActiveSemester(target, false);

      const allCourses = await CourseModel.find({});

      allCourses
        .filter((course) => course.semesterId === target.id)
        .map((course) => expect(course.enabled).toBeFalsy());

      allCourses
        .filter((course) => course.semesterId !== target.id)
        .map((course) => expect(course.enabled).toBeTruthy());
    });

    it('setSemester enables courses when true ', async () => {
      const target = await getSemester('Spring', 2020);

      await service.toggleActiveSemester(target, false);

      const allCourses = await CourseModel.find({
        semester: target,
      });

      expect(allCourses.length).toBeGreaterThan(0);
      allCourses.map((course) => expect(course.enabled).toBeFalsy());

      await service.toggleActiveSemester(target, true);

      const allCourses2 = await CourseModel.find({
        semester: target,
      });
      expect(allCourses.length).toBeGreaterThan(0);

      allCourses2.map((course) => expect(course.enabled).toBeTruthy());
    });
  });
});
