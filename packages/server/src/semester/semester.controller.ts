import { SemesterPartial } from '@koh/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'guards/jwt-auth.guard';
import { SemesterModel } from './semester.entity';

@Controller('semesters')
@UseGuards(JwtAuthGuard)
export class SemesterController {
  @Get()
  async get(): Promise<SemesterPartial[]> {
    return SemesterModel.find();
  }
}
