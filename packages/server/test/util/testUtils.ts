import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as supertest from 'supertest';
import * as cookieParser from 'cookie-parser';
import { ProfileModule } from '../../src/profile/profile.module';
import { JwtService } from '@nestjs/jwt';

export interface SupertestOptions {
  userId?: number;
}

export function setupIntegrationTest(
  module: Type<any>,
): (u?: SupertestOptions) => supertest.SuperTest<supertest.Test> {
  let app: INestApplication;
  let jwtService: JwtService;
  let conn: Connection;

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        module,
        ProfileModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '',
          database: 'test',
          entities: ['./**/*.entity.ts'],
          synchronize: true,
        }),
        ConfigModule.forRoot({
          envFilePath: ['.env', '.env.development'],
          isGlobal: true,
        }),
      ],
    }).compile();
    app = testModule.createNestApplication();
    app.use(cookieParser());
    jwtService = testModule.get<JwtService>(JwtService);
    conn = testModule.get<Connection>(Connection);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true);
  });

  return (options?: SupertestOptions): supertest.SuperTest<supertest.Test> => {
    const agent = supertest.agent(app.getHttpServer());
    if (options?.userId) {
      const token = jwtService.sign({ userId: options.userId });
      agent.set('Cookie', [`auth_token=${token}`]);
    }
    return agent;
  };
}
