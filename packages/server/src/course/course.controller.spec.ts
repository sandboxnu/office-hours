import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CourseController } from './course.controller';

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

  it.skip('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
