import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller';

@Module({
  controllers: [SemesterController],
})
export class SemesterModule {}
