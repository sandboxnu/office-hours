import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DesktopNotifBody, TwilioBody } from '@template/common';
import * as twilio from 'twilio';
import { JwtAuthGuard } from '../login/jwt-auth.guard';
import { NotificationService } from './notification.service';

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

  @Post('desktop/register/:user_id')
  @UseGuards(JwtAuthGuard)
  async registerDesktopUser(
    @Body() body: DesktopNotifBody,
    @Param('user_id') user_id: number,
  ): Promise<string> {
    await this.notifService.registerDesktop({
      endpoint: body.endpoint,
      expirationTime: body.expirationTime && new Date(body.expirationTime),
      p256dh: body.keys.p256dh,
      auth: body.keys.auth,
      userId: user_id,
    });
    return 'registration success';
  }

  @Post('phone/register/:user_id')
  @UseGuards(JwtAuthGuard)
  async registerPhoneUser(
    @Body() body: { phoneNumber: string },
    @Param('user_id') user_id: number,
  ): Promise<string> {
    await this.notifService.registerPhone(body.phoneNumber, user_id);
    return `registration success for ${body.phoneNumber}`;
  }

  // TODO: GET RID OF THIS
  @Post('/notify_user/:user_id')
  @UseGuards(JwtAuthGuard)
  async notifyUser(@Param('user_id') user_id: number): Promise<string> {
    await this.notifService.notifyUser(
      user_id,
      "bruh if you're still tryna test notifications, ligma balls, FUCK FUCK FUCK FUCK FUCK, sugondese, hot cheetos",
    );
    return 'notified';
  }

  @Post('/phone/verify')
  @Header('Content-Type', 'text/xml')
  async verifyPhoneUser(
    @Body() body: TwilioBody,
    @Headers('x-twilio-signature') twilioSignature: string,
  ): Promise<void> {
    const message = body.Body.trim().toUpperCase();
    const senderNumber = body.From;

    const twilioAuthToken = this.configService.get('TWILIOAUTHTOKEN');

    const isValidated = twilio.validateRequest(
      twilioAuthToken,
      twilioSignature.trim(),
      'https://28a88b3af262.ngrok.io/api/v1/notifications/phone/verify',
      body,
    );

    if (!isValidated) {
      throw new UnauthorizedException('Message not from Twilio');
    }

    const messageToUser = await this.notifService.verifyPhone(
      senderNumber,
      message,
    );
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    twiml.message(messageToUser);

    return twiml.toString();
  }
}
