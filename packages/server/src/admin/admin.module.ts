import { Module } from '@nestjs/common';
import {
  AdminCoreModuleFactory,
  AdminAuthModuleFactory,
  DefaultAdminSite,
} from 'nestjs-admin';
import { adminCredentialValidator } from './credentialValidator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserModel } from './admin-user.entity';
import { CourseAdmin, QueueAdmin, UserAdmin } from './admin-entities';
import { AdminCommand } from './admin.command';

const CoreModule = AdminCoreModuleFactory.createAdminCoreModule({});
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
    adminSite.register('Queue', QueueAdmin);
  }
}
