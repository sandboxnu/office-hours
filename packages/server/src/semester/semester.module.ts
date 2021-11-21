import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller';
import { SetSemesterCommand } from './setCourse.command';

@Module({
  controllers: [SemesterController],
  providers: [SetSemesterCommand],
})
export class SemesterModule {}
