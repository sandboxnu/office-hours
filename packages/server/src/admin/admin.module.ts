/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import {
  AdminCoreModuleFactory,
  AdminAuthModuleFactory,
  DefaultAdminSite,
} from 'nestjs-admin';
import { adminCredentialValidator } from './credentialValidator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserModel } from './admin-user.entity';
import {
  CourseAdmin,
  QueueAdmin,
  UserAdmin,
  UserCourseAdmin,
  CourseSectionMappingAdmin,
  SemesterAdmin,
} from './admin-entities';
import { AdminCommand } from './admin.command';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';

const redisClient = createClient({
  host: process.env.REDIS_HOST || 'localhost',
});

const RedisStore = connectRedis(session);

// This stops redisClient from causing jest tests to hang from an open handler
// We only use redisClient in the admin module, which isn't needed for our tests
if (process.env.NODE_ENV === 'test') {
  redisClient.quit();
}

const CoreModule = AdminCoreModuleFactory.createAdminCoreModule({
  appConfig: {
    session: {
      store: new RedisStore({ client: redisClient }),
    },
  },
});
const AuthModule = AdminAuthModuleFactory.createAdminAuthModule({
  adminCoreModule: CoreModule,
  credentialValidator: adminCredentialValidator, // how do you validate credentials
  imports: [TypeOrmModule.forFeature([AdminUserModel])], // what modules export the dependencies of the credentialValidator available
  providers: [],
});

@Module({
  imports: [CoreModule, AuthModule],
  exports: [CoreModule, AuthModule],
  providers: [AdminCommand],
})
export class AdminModule {
  constructor(private readonly adminSite: DefaultAdminSite) {
    adminSite.register('Course', CourseAdmin);
    adminSite.register('User', UserAdmin);
    adminSite.register('UserCourse', UserCourseAdmin);
    adminSite.register('Queue', QueueAdmin);
    adminSite.register('CourseSectionMapping', CourseSectionMappingAdmin);
    adminSite.register('Semester', SemesterAdmin);
  }
}
