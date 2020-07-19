import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DesktopNotifBody } from '@template/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private notifService: NotificationService) {}

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
  async verifyPhoneUser(
    @Body() body: any, // no built-in type seems to exist :/. Can type from JSON blob sent to dajin
    @Res() response: Response,
  ): Promise<void> {
    const message = body.Body.trim().toUpperCase();
    const senderNumber = body.From;

    const messageToUser = await this.notifService.verifyPhone(
      senderNumber,
      message,
    );
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    twiml.message(messageToUser);
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.end(twiml.toString());
  }
}
