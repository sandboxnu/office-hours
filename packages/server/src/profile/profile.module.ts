import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { NotificationModule } from '../notification/notification.module';
import { ProfileService } from './profile.service';
import { LoginModule } from 'login/login.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginCourseService } from 'login/login-course.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from 'mail/mail.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [
    NotificationModule,
    LoginModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    OrganizationModule,
  ],
  controllers: [ProfileController],
  providers: [JwtStrategy, ProfileService, LoginCourseService],
})
export class ProfileModule {}
