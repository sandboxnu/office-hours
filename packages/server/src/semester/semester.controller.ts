import { SemesterPartial } from '@koh/common';
import { Controller, Get } from '@nestjs/common';
import { SemesterModel } from './semester.entity';

@Controller('semesters')
export class SemesterController {
  @Get()
  async get(): Promise<SemesterPartial[]> {
    return SemesterModel.find();
  }
}
