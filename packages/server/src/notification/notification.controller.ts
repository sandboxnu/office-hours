import { DesktopNotifBody, DesktopNotifPartial } from '@koh/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserId } from '../decorators/user.decorator';
import { DesktopNotifModel } from './desktop-notif.entity';
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
}
