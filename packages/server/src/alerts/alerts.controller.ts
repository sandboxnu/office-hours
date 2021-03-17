import {
  CreateAlertParams,
  CreateAlertResponse,
  ERROR_MESSAGES,
  GetAlertsResponse,
  Role,
} from '@koh/common';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { pick } from 'lodash';
import { JwtAuthGuard } from 'login/jwt-auth.guard';
import { User } from 'profile/user.decorator';
import { UserModel } from 'profile/user.entity';
import { Roles } from '../profile/roles.decorator';
import { AlertModel } from './alerts.entity';

@Controller('alerts')
@UseGuards(JwtAuthGuard)
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
    ).map((alert) => pick(alert, ['sent', 'alertType', 'payload', 'id']));

    // TODO: service to process each type of alertType... wish we had ocaml pattern matching for once
    // TODO: mostly for the rephrase question modal, should close the alert automatically if either the queue
    // is closed, or the question is old

    return { alerts };
  }

  @Post()
  @Roles(Role.TA, Role.PROFESSOR)
  async createAlert(
    @Body() body: CreateAlertParams,
  ): Promise<CreateAlertResponse> {
    const { alertType, courseId, payload, targetUserId } = body;

    const anotherAlert = await AlertModel.findOne({
      where: {
        alertType,
        userId: targetUserId,
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
      userId: targetUserId,
      courseId,
      payload,
    }).save();

    return alert;
  }

  @Patch(':alertId')
  @Roles(Role.STUDENT, Role.TA, Role.PROFESSOR)
  async closeAlert(@Param('alertId') alertId: number): Promise<void> {
    const alert = await AlertModel.findOne({
      where: {
        id: alertId,
      },
    });

    if (!alert) {
      throw new BadRequestException(
        ERROR_MESSAGES.alertController.notActiveAlert,
      );
    }

    alert.resolved = new Date();
    await alert.save();
  }
}
