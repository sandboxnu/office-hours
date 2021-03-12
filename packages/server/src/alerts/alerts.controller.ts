import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'profile/user.decorator';
import { UserModel } from 'profile/user.entity';
import { AlertModel } from './alerts.entity';
import {
  AlertType,
  CreateAlertParams,
  CreateAlertResponse,
  ERROR_MESSAGES,
  GetAlertsResponse,
  RephraseQuestionPayload,
  Role,
} from '@koh/common';
import { pick } from 'lodash';
import { Roles } from '../profile/roles.decorator';

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
      return pick(alert, ['sent', 'alertType', 'payload']);
    });

    alerts.forEach((alert) => {
      switch (alert.alertType) {
        case AlertType.REPHRASE_QUESTION:
          alert.payload = alert.payload as RephraseQuestionPayload;
          break;
      }
    });

    return { alerts };
  }

  @Post()
  @Roles(Role.TA)
  async createAlert(
    @Body() body: CreateAlertParams,
    @User() user: UserModel,
  ): Promise<CreateAlertResponse> {
    const { alertType, courseId, payload } = body;

    const anotherAlert = await AlertModel.findOne({
      where: {
        type: alertType,
        user: user,
        payload: payload,
      },
    });

    // If the same user already has an alert for this then don't create a new one
    if (anotherAlert) {
      throw new BadRequestException(
        ERROR_MESSAGES.alertController.duplicateAlert,
      );
    }

    const alert = await AlertModel.create({
      alertType,
      sent: new Date(),
      resolved: null,
      user: user,
      courseId,
      payload,
    });

    return alert;
  }
}
