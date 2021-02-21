import { Get, Param, Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'profile/user.decorator';
import { UserModel } from 'profile/user.entity';
import { AlertModel } from './alerts.entity';

@Controller('alerts')
export class AlertsController {
  @Get(':courseId')
  async getAlerts(
    @Param('courseId') courseId: number,
    @User() user: UserModel,
  ) {
    return await AlertModel.find({
      where: {
        courseId,
        user,
      },
    });
  }
}
