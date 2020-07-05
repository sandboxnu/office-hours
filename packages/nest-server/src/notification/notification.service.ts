import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as webPush from 'web-push';
import * as twilio from 'twilio';
import { DesktopNotif } from './desktop-notif.entity';
import { PhoneNotif } from './phone-notif.entity';
import { DeepPartial } from 'typeorm';
import { User } from '../profile/user.entity';

@Injectable()
export class NotificationService {
  private twilioClient: twilio.Twilio;
  desktopPublicKey: string;

  constructor(private configService: ConfigService) {
    this.twilioClient = twilio(
      this.configService.get('TWILIOACCOUNTSID'),
      this.configService.get('TWILIOAUTHTOKEN'),
    );
    webPush.setVapidDetails(
      this.configService.get('EMAIL'),
      this.configService.get('PUBLICKEY'),
      this.configService.get('PRIVATEKEY'),
    );
    this.desktopPublicKey = this.configService.get('PUBLICKEY');
  }

  async registerDesktop(info: DeepPartial<DesktopNotif>) {
    await DesktopNotif.create(info).save();
  }

  async registerPhone(phoneNumber: string, userId: number) {
    try {
      phoneNumber = (
        await this.twilioClient.lookups.phoneNumbers(phoneNumber).fetch()
      ).phoneNumber;
    } catch (err) {
      // if the phone number is not found, then endpoint should return invalid
      throw new BadRequestException('phone number invalid');
    }

    // todo: need to verify that the user owns the phone number before adding it
    await PhoneNotif.create({
      phoneNumber,
      userId,
    }).save();
  }

  // Notify user on all platforms
  async notifyUser(userId: number) {
    const notifModelsOfUser = await User.findOne({
      where: {
        id: userId,
      },
      relations: ['desktopNotifs', 'phoneNotifs'],
    });

    // run the promises concurrently
    await Promise.all([
      ...notifModelsOfUser.desktopNotifs.map(async nm =>
        this.notifyDesktop(nm, 'joe mama'),
      ),
      ...notifModelsOfUser.phoneNotifs.map(async pn => {
        this.notifyPhone(pn, 'have u heard of ligma?');
      }),
    ]);
  }

  // notifies a user via desktop notification
  async notifyDesktop(nm: DesktopNotif, message: string) {
    try {
      await webPush.sendNotification(
        {
          endpoint: nm.endpoint,
          keys: {
            p256dh: nm.p256dh,
            auth: nm.auth,
          },
        },
        message,
      );
    } catch (error) {
      await DesktopNotif.remove(nm);
    }
  }

  // notifies a user via phone number
  async notifyPhone(pn: PhoneNotif, message: string) {
    try {
      this.twilioClient &&
        (await this.twilioClient.messages.create({
          body: message,
          from: this.configService.get('TWILIOPHONENUMBER'),
          to: pn.phoneNumber,
        }));
    } catch (error) {
      console.error('problem sending message', error);
    }
  }
}
