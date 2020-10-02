import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DesktopNotifBody, DesktopNotifPartial, TwilioBody } from '@koh/common';
import * as twilio from 'twilio';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { UserId } from '../profile/user.decorator';
import { DesktopNotifModel } from './desktop-notif.entity';

@Controller('notifications')
export class NotificationController {
  constructor(
    private notifService: NotificationService,
    private configService: ConfigService,
  ) {}

  @Get('desktop/credentials')
  @UseGuards(JwtAuthGuard)
  getDesktopCredentials(): string {
    return JSON.stringify(this.notifService.desktopPublicKey);
  }

  @Post('desktop/device')
  @UseGuards(JwtAuthGuard)
  async registerDesktopUser(
    @Body() body: DesktopNotifBody,
    @UserId() userId: number,
  ): Promise<DesktopNotifPartial> {
    const device = await this.notifService.registerDesktop({
      endpoint: body.endpoint,
      expirationTime: body.expirationTime && new Date(body.expirationTime),
      p256dh: body.keys.p256dh,
      auth: body.keys.auth,
      name: body.name,
      userId: userId,
    });
    return {
      id: device.id,
      endpoint: device.endpoint,
      createdAt: device.createdAt,
      name: device.name,
    };
  }

  @Delete('desktop/device/:deviceId')
  @UseGuards(JwtAuthGuard)
  async deleteDesktopUser(
    @Param('deviceId') deviceId: number,
    @UserId() userId: number,
  ): Promise<void> {
    const dn = await DesktopNotifModel.find({ id: deviceId, userId });
    if (dn.length > 0) {
      await DesktopNotifModel.remove(dn);
    } else {
      throw new NotFoundException();
    }
  }

  // Webhook from twilio
  @Post('/phone/verify')
  @Header('Content-Type', 'text/xml')
  async verifyPhoneUser(
    @Body() body: TwilioBody,
    @Headers('x-twilio-signature') twilioSignature: string,
  ): Promise<string> {
    const message = body.Body.trim().toUpperCase();
    const senderNumber = body.From;

    const twilioAuthToken = this.configService.get('TWILIOAUTHTOKEN');

    const isValidated = twilio.validateRequest(
      twilioAuthToken,
      twilioSignature.trim(),
      `${this.configService.get('DOMAIN')}/api/v1/notifications/phone/verify`,
      body,
    );

    if (!isValidated) {
      throw new UnauthorizedException('Message not from Twilio');
    }

    const messageToUser = await this.notifService.verifyPhone(
      senderNumber,
      message,
    );
    const MessagingResponse = twilio.twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    twiml.message(messageToUser);

    return twiml.toString();
  }
}
