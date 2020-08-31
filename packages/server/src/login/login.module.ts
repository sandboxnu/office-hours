import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { JwtStrategy } from '../login/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoginCourseService } from './login-course.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [JwtStrategy, LoginCourseService],
})
export class LoginModule {}
