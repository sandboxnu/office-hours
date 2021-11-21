import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';
import { SetSemesterCommand } from './setCourse.command';

@Module({
  controllers: [SemesterController],
  providers: [SetSemesterCommand, SemesterService],
})
export class SemesterModule {}
