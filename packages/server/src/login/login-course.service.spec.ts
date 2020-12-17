import { TestingModule, Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { TestTypeOrmModule, TestConfigModule } from '../../test/util/testUtils';
import { LoginCourseService } from './login-course.service';

describe('LoginCourseService', () => {
  let service: LoginCourseService;

  let conn: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TestTypeOrmModule, TestConfigModule],
      providers: [LoginCourseService],
    }).compile();

    service = module.get<LoginCourseService>(LoginCourseService);
    conn = module.get<Connection>(Connection);
  });

  afterAll(async () => {
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  it('adds new user', () => {
    service.addUserFromKhoury({
      email: 'alex@northeastern.edu',
      campus: '116',
      first_name: 'Alex',
      last_name: 'Takayama',
      photo_url: 'jdiofsjiofjwe',
      courses: [{ course: 'CS2500' }],
      // TODO
    });
  });
  it('updates user courses but not their name', () => {}); //TODO
});
