import { Controller, Get, Body, Post, Param, UseGuards } from '@nestjs/common';
import { DesktopNotifBody } from '@template/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../profile/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private notifService: NotificationService) {}

  @Get('desktop/credentials')
  getDesktopCredentials(): string {
    return JSON.stringify(this.notifService.desktopPublicKey);
  }

  @Post('desktop/register/:user_id')
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
  async registerPhoneUser(
    @Body() body: { phoneNumber: string },
    @Param('user_id') user_id: number,
  ): Promise<string> {
    await this.notifService.registerPhone(body.phoneNumber, user_id);
    return `registration success for ${body.phoneNumber}`;
  }

  @Post('/notify_user/:user_id')
  async notifyUser(@Param('user_id') user_id: number): Promise<string> {
    await this.notifService.notifyUser(user_id);
    return 'notified';
  }
}
