import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CourseController } from './course.controller';

import { OfficeHour } from '../course/office-hour.entity';
import { Course } from './course.entity';
import { UserFactory } from '../factory';

describe('Course Controller', () => {
  let app: INestApplication;
  let controller: CourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/courses/{course_id}/schedule (GET)', async () => {
    const course = await Course.create({
      name: 'CS 2500',
      icalURL: 'testest.com/water-sausage',
    }).save();
    await OfficeHour.create({
      title: "Matthias's Special Office Hours",
      room: 'WVH 308',
      startTime: new Date(1970, 4, 20),
      endTime: new Date(1999, 4, 20),
      courseId: course.id,
    }).save();
    const user = await UserFactory.create();

    const get = request(app.getHttpServer())
      .get('/courses/{courses_id}/schedule')
      .expect(200)
      .expect({
        data: {
          name: 'CS 2500',
          officeHours: [
            {
              endTime: new Date(1999, 4, 20),
              id: 1,
              room: 'WVH 308',
              startTime: new Date(1970, 4, 20),
              title: "Matthias's Special Office Hours",
            },
          ],
        },
      });

    // const get = await injectAsUser(getServer(), user, {
    // method: "get",
    // url: `/api/v1/courses/${course.id}/schedule`,
    // });
  });
});
