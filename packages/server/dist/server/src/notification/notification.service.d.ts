import { ConfigService } from '@nestjs/config';
import { DeepPartial } from 'typeorm';
import { UserModel } from '../profile/user.entity';
import { DesktopNotifModel } from './desktop-notif.entity';
import { PhoneNotifModel } from './phone-notif.entity';
import { TwilioService } from './twilio/twilio.service';
export declare const NotifMsgs: {
    phone: {
        WRONG_MESSAGE: string;
        COULD_NOT_FIND_NUMBER: string;
        UNREGISTER: string;
        DUPLICATE: string;
        OK: string;
    };
    queue: {
        ALERT_BUTTON: string;
        THIRD_PLACE: string;
        TA_HIT_HELPED: (taName: string) => string;
        REMOVED: string;
    };
    ta: {
        STUDENT_JOINED_EMPTY_QUEUE: string;
    };
};
export declare class NotificationService {
    private configService;
    private twilioService;
    desktopPublicKey: string;
    constructor(configService: ConfigService, twilioService: TwilioService);
    registerDesktop(info: DeepPartial<DesktopNotifModel>): Promise<DesktopNotifModel>;
    registerPhone(phoneNumber: string, user: UserModel): Promise<void>;
    notifyUser(userId: number, message: string): Promise<void>;
    notifyDesktop(nm: DesktopNotifModel, message: string): Promise<void>;
    notifyPhone(pn: PhoneNotifModel, message: string, force: boolean): Promise<void>;
    verifyPhone(phoneNumber: string, message: string): Promise<string>;
}
