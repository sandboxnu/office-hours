import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';
import * as webPush from 'web-push';
import { UserModel } from '../profile/user.entity';
import { DesktopNotifModel } from './desktop-notif.entity';

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
    OK: 'Thank you for verifying your number with Khoury Office Hours! You are now signed up for text notifications!',
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

  constructor(private configService: ConfigService) {
    webPush.setVapidDetails(
      this.configService.get('EMAIL'),
      this.configService.get('PUBLICKEY'),
      this.configService.get('PRIVATEKEY'),
    );
    this.desktopPublicKey = this.configService.get('PUBLICKEY');
  }

  async registerDesktop(
    info: DeepPartial<DesktopNotifModel>,
  ): Promise<DesktopNotifModel> {
    // create if not exist
    let dn = await DesktopNotifModel.findOne({
      where: { userId: info.userId, endpoint: info.endpoint },
    });
    if (!dn) {
      dn = await DesktopNotifModel.create(info).save();
      await dn.reload();
    }
    return dn;
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
}
