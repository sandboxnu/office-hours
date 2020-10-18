import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { INestApplication, Type } from '@nestjs/common';
import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as supertest from 'supertest';
import { LoginModule } from '../../src/login/login.module';
import { JwtService } from '@nestjs/jwt';
import { addGlobalsToApp } from '../../src/bootstrap';
import { TwilioService } from '../../src/notification/twilio/twilio.service';
import { mocked } from 'ts-jest/utils';
import { NotificationService } from 'notification/notification.service';

export interface SupertestOptions {
  userId?: number;
}
export type ModuleModifier = (t: TestingModuleBuilder) => TestingModuleBuilder;
export const TestTypeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'test',
  entities: ['./**/*.entity.ts'],
  synchronize: true,
});

// Fake twilio so we don't try to text people in tests
export const mockTwilio = {
  getFullPhoneNumber: async (s: string) =>
    s.startsWith('real') ? s : 'real' + s,
  sendSMS: async () => null,
};

export const TestConfigModule = ConfigModule.forRoot({
  envFilePath: ['.env.development'],
  isGlobal: true,
});

export function setupIntegrationTest(
  module: Type<any>,
  modifyModule?: ModuleModifier,
): (u?: SupertestOptions) => supertest.SuperTest<supertest.Test> {
  let app: INestApplication;
  let jwtService: JwtService;
  let conn: Connection;

  beforeAll(async () => {
    let testModuleBuilder = Test.createTestingModule({
      imports: [module, LoginModule, TestTypeOrmModule, TestConfigModule],
    })
      .overrideProvider(TwilioService)
      .useValue(mockTwilio);

    if (modifyModule) {
      testModuleBuilder = modifyModule(testModuleBuilder);
    }
    const testModule = await testModuleBuilder.compile();

    app = testModule.createNestApplication();
    addGlobalsToApp(app);
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

const notifMock = mocked({ notifyUser: jest.fn() }, true);
/**
 * Module Modifier tests can pass to setupIntegrationTest to mock the notifService and to expect things
 * ex:
 * const supertest = setupIntegrationTest(QuestionModule, modifyMockNotifs);
 */

export const modifyMockNotifs: ModuleModifier = (t) =>
  t.overrideProvider(NotificationService).useValue(notifMock);
export const expectUserNotified = (userId: number): void =>
  expect(notifMock.notifyUser).toHaveBeenCalledWith(userId, expect.any(String));
