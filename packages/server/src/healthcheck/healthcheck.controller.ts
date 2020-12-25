import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

@Controller('healthcheck')
export class HealthcheckController {
  @Get('/')
  health(): string {
    return 'healthy';
  }
}
