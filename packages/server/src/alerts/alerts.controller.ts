import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'profile/user.decorator';
import { UserModel } from 'profile/user.entity';
import { AlertModel } from './alerts.entity';
import {
  AlertType,
  CloseAlertResponse,
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
  @Roles(Role.TA, Role.PROFESSOR)
  async createAlert(
    @Body() body: CreateAlertParams,
    @User() user: UserModel,
  ): Promise<CreateAlertResponse> {
    console.log('here', body);
    const { alertType, courseId, payload } = body;

    const anotherAlert = await AlertModel.findOne({
      where: {
        type: alertType,
        user: user,
        payload: payload,
        resolved: null,
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
    }).save();

    console.log('ligma4');
    return alert;
  }

  @Patch(':alertId')
  @Roles(Role.STUDENT, Role.TA, Role.PROFESSOR)
  async closeAlert(
    @Param(':alertId') alertId: number,
    @User() user: UserModel,
  ): Promise<CloseAlertResponse> {
    const alert = await AlertModel.findOne({
      where: {
        alertId: alertId,
        user: user,
        resolved: null,
      },
    });

    if (!alert) {
      throw new BadRequestException(
        ERROR_MESSAGES.alertController.notActiveAlert,
      );
    }

    alert.resolved = new Date();
    return alert;
  }
}
