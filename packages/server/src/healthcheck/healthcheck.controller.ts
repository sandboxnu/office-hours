import { Controller } from '@nestjs/common';
import { Get, Res } from '@nestjs/common/decorators';
import { Request, Response } from 'express';

@Controller('healthcheck')
export class HealthcheckController {
  @Get('/')
  health(): string {
    return 'healthy';
  }
}
