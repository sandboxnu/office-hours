import { Module } from '@nestjs/common';
import { AdminCoreModuleFactory, AdminAuthModuleFactory } from 'nestjs-admin';
import { adminCredentialValidator } from './credentialValidator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserModel } from './admin-user.entity';

const CoreModule = AdminCoreModuleFactory.createAdminCoreModule({});
const AuthModule = AdminAuthModuleFactory.createAdminAuthModule({
  adminCoreModule: CoreModule,
  credentialValidator: adminCredentialValidator, // how do you validate credentials
  imports: [TypeOrmModule.forFeature([AdminUserModel])], // what modules export the dependencies of the credentialValidator available
  providers: [],
});

@Module({
  imports: [CoreModule, AuthModule],
})
export class AdminModule {}
