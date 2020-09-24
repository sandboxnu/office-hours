import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';
import * as webPush from 'web-push';
import { UserModel } from '../profile/user.entity';
import { DesktopNotifModel } from './desktop-notif.entity';
import { PhoneNotifModel } from './phone-notif.entity';
import { TwilioService } from './twilio/twilio.service';
import * as apm from 'elastic-apm-node';

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
    ALERT_BUTTON:
      "The TA could't reach you, please have Microsoft Teams open and confirm you are back!",
    THIRD_PLACE: `You're 3rd in the queue. Be ready for a TA to call you soon!`,
    TA_HIT_HELPED: (taName: string): string =>
      `${taName} is coming to help you!`,
    REMOVED: `You've been removed from the queue. Please return to the app for more information.`,
  },
  ta: {
    STUDENT_JOINED_EMPTY_QUEUE:
      'A student has joined your (previously empty) queue!',
  },
};

//TODO test this service omg
@Injectable()
export class NotificationService {
  desktopPublicKey: string;

  constructor(
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
    if (
      (await DesktopNotifModel.count({
        where: { userId: info.userId, endpoint: info.endpoint },
      })) === 0
    ) {
      await DesktopNotifModel.create(info).save();
    }
  }

  async registerPhone(phoneNumber: string, user: UserModel): Promise<void> {
    const fullNumber = await this.twilioService.getFullPhoneNumber(phoneNumber);
    if (!fullNumber) {
      throw new BadRequestException('phone number invalid');
    }

    let phoneNotifModel = await PhoneNotifModel.findOne({
      userId: user.id,
    });

    if (phoneNotifModel) {
      // Phone number has not changed
      if (phoneNotifModel.phoneNumber === fullNumber) {
        return;
      } else {
        // Need to just change it
        phoneNotifModel.phoneNumber = fullNumber;
        phoneNotifModel.verified = false;
        await phoneNotifModel.save();
      }
    } else {
      phoneNotifModel = await PhoneNotifModel.create({
        phoneNumber: fullNumber,
        userId: user.id,
        verified: false,
      }).save();
      
      // MUTATE so if user.save() is called later it doesn't dis-associate
      user.phoneNotif = phoneNotifModel;
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
      relations: ['desktopNotifs', 'phoneNotif'],
    });

    // run the promises concurrently
    if (notifModelsOfUser.desktopNotifsEnabled) {
      await Promise.all(
        notifModelsOfUser.desktopNotifs.map(async (nm) =>
          this.notifyDesktop(nm, message),
        ),
      );
    }
    if (notifModelsOfUser.phoneNotif && notifModelsOfUser.phoneNotifsEnabled) {
      this.notifyPhone(notifModelsOfUser.phoneNotif, message, false);
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
      apm.setCustomContext({phoneNumber})
      apm.captureError(new Error('Could not find phone number during verification'));
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
