import { Get, Param, Controller } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'profile/user.decorator';
import { UserModel } from 'profile/user.entity';
import { AlertModel } from './alerts.entity';
import { GetAlertsResponse } from '@koh/common';
import { pick } from 'lodash';

@Controller('alerts')
export class AlertsController {
  @Get(':courseId')
  async getAlerts(
    @Param('courseId') courseId: number,
    @User() user: UserModel,
  ): Promise<GetAlertsResponse> {
    const alerts = (
      await AlertModel.find({
        where: {
          courseId,
          user,
          resolved: null,
        },
      })
    ).map((alert) => {
      pick(alert, ['sent', 'alertType']);
    });

    return { alerts };
  }
}
