import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { SignupService } from './signup.service';

@Module({
  controllers: [SignupController],
  providers: [SignupService],
})
export class SignupModule {}
