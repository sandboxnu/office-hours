import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DesktopNotifBody } from '@template/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { PhoneNotifModel } from './phone-notif.entity';

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
    @Res() response: Response,
  ): Promise<string> {
    await this.notifService.registerPhone(body.phoneNumber, user_id, response);
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
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const message = request.body.Body.trim().toUpperCase();
    const senderNumber = request.body.From;

    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const twiml = new MessagingResponse();

    if (message !== 'YES' && message !== 'NO' && message !== 'STOP') {
      twiml.message(
        'Please respond with either YES or NO. Text STOP at any time to stop receiving text messages',
      );
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.end(twiml.toString());
      return;
    }

    const phoneNotif = await PhoneNotifModel.findOne({
      where: { phoneNumber: senderNumber },
    });

    if (!phoneNotif) {
      twiml.message(
        'Could not find an Office Hours account with your phone number.',
      );
    } else if (message === 'NO' || message === 'STOP') {
      // might not need stop -- Twilio might auto do that for us? a little crazy but that's ok
      await PhoneNotifModel.delete(phoneNotif);
      twiml.message(
        "You've unregistered from text notifications for Khoury Office Hours. Feel free to re-register any time through the website",
      );
    } else if (phoneNotif.verified) {
      twiml.message(
        "You've already been verified to receive text notifications from Khoury Office Hours!",
      );
    } else {
      phoneNotif.verified = true;
      await phoneNotif.save();

      twiml.message(
        'Thank you for verifying your number with Khoury Office Hours! You are now signed up for text notifications!',
      );
    }
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.end(twiml.toString());
    return;
  }
}
