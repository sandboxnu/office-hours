import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, DeepPartial } from 'typeorm';
import * as webPush from 'web-push';
import { UserModel } from '../profile/user.entity';
import { DesktopNotifModel } from './desktop-notif.entity';
import { PhoneNotifModel } from './phone-notif.entity';
import { TwilioService } from './twilio/twilio.service';

export const NotifMsgs = {
  phone: {
    WRONG_MESSAGE:
      'Please respond with either YES or NO. Text STOP at any time to stop receiving text messages',
    COULD_NOT_FIND_NUMBER:
      'Could not find an Office Hours account with your phone number.',
    UNREGISTER:
      "You've unregistered from text notifications for Khoury Office Hours. Feel free to re-register any time through the website",
    DUPLICATE:
      "You've already been verified to receive text notifications from Khoury Office Hours!",
    OK:
      'Thank you for verifying your number with Khoury Office Hours! You are now signed up for text notifications!',
  },
  queue: {
    ALERT_BUTTON: 'Get ready! A TA is coming to help you.',
    THIRD_PLACE: `You're 3rd in the queue. Be ready for a TA to call you soon!`,
    TA_HIT_HELPED: (taName: string): string =>
      `${taName} is coming to help you!`,
  },
};

//TODO test this service omg
@Injectable()
export class NotificationService {
  desktopPublicKey: string;

  constructor(
    private connection: Connection,
    private configService: ConfigService,
    private twilioService: TwilioService,
  ) {
    webPush.setVapidDetails(
      this.configService.get('EMAIL'),
      this.configService.get('PUBLICKEY'),
      this.configService.get('PRIVATEKEY'),
    );
    this.desktopPublicKey = this.configService.get('PUBLICKEY');
  }

  async registerDesktop(info: DeepPartial<DesktopNotifModel>): Promise<void> {
    // create if not exist
    if ((await DesktopNotifModel.count(info)) === 0) {
      await DesktopNotifModel.create(info).save();
    }
  }

  async registerPhone(phoneNumber: string, userId: number): Promise<void> {
    if (!this.twilioService.isPhoneNumberReal) {
      throw new BadRequestException('phone number invalid');
    }

    let phoneNotifModel = await PhoneNotifModel.findOne({
      userId,
      phoneNumber,
    });

    if (phoneNotifModel) {
      // Phone number has not changed
      if (phoneNotifModel.phoneNumber === phoneNumber) {
        return;
      } else {
        // Need to just change it
        phoneNotifModel.phoneNumber = phoneNumber;
        phoneNotifModel.verified = false;
        await phoneNotifModel.save();
      }
    } else {
      phoneNotifModel = await PhoneNotifModel.create({
        phoneNumber,
        userId,
        verified: false,
      }).save();
    }

    await this.notifyPhone(
      phoneNotifModel,
      "You've signed up for phone notifications for Khoury Office Hours. To verify your number, please respond to this message with YES. To unsubscribe, respond to this message with NO or STOP",
      true,
    );
  }

  // Notify user on all platforms
  async notifyUser(userId: number, message: string): Promise<void> {
    const notifModelsOfUser = await UserModel.findOne({
      where: {
        id: userId,
      },
      relations: ['desktopNotifs'],
    });

    // run the promises concurrently
    if (notifModelsOfUser.desktopNotifsEnabled) {
      await Promise.all(
        notifModelsOfUser.desktopNotifs.map(async (nm) =>
          this.notifyDesktop(nm, message),
        ),
      );
    }

    if (notifModelsOfUser.phoneNotifsEnabled) {
      const phoneNotifModel = await PhoneNotifModel.findOne({
        where: { userId },
      });
      this.notifyPhone(phoneNotifModel, message, false);
    }
  }

  // notifies a user via desktop notification
  async notifyDesktop(nm: DesktopNotifModel, message: string): Promise<void> {
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
      await DesktopNotifModel.remove(nm);
    }
  }

  // notifies a user via phone number
  async notifyPhone(
    pn: PhoneNotifModel,
    message: string,
    force: boolean,
  ): Promise<void> {
    console.log('peepee', pn);
    if (force || pn.verified) {
      try {
        await this.twilioService.sendSMS(pn.phoneNumber, message);
      } catch (error) {
        console.error('problem sending message', error);
      }
    }
  }

  async verifyPhone(phoneNumber: string, message: string): Promise<string> {
    const phoneNotif = await PhoneNotifModel.findOne({
      where: { phoneNumber: phoneNumber },
    });

    if (!phoneNotif) {
      return NotifMsgs.phone.COULD_NOT_FIND_NUMBER;
    } else if (message !== 'YES' && message !== 'NO' && message !== 'STOP') {
      return NotifMsgs.phone.WRONG_MESSAGE;
    } else if (message === 'NO' || message === 'STOP') {
      // did some more digging, STOP just stops messages completely, we'll never receive it
      // so uh... there's probably a way to do that
      await PhoneNotifModel.delete(phoneNotif);
      return NotifMsgs.phone.UNREGISTER;
    } else if (phoneNotif.verified) {
      return NotifMsgs.phone.DUPLICATE;
    } else {
      phoneNotif.verified = true;
      await phoneNotif.save();
      return NotifMsgs.phone.OK;
    }
  }
}
