import {  Connection } from 'typeorm';
import { INestApplication, Type } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as supertest from 'supertest';

export function setupIntegrationTest(module: Type<any>): () => supertest.SuperTest<supertest.Test> {
  let app: INestApplication;
  let conn: Connection;

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      imports: [
        module,
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
      ],
    }).compile();
    app = testModule.createNestApplication();
    conn = testModule.get<Connection>(Connection)
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await conn.close();
  });

  beforeEach(async () => {
    await conn.synchronize(true)
  })

  return () => supertest(app.getHttpServer());
}
