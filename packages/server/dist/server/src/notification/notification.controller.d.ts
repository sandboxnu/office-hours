import { DesktopNotifBody, DesktopNotifPartial, TwilioBody } from '@koh/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from './notification.service';
export declare class NotificationController {
    private notifService;
    private configService;
    constructor(notifService: NotificationService, configService: ConfigService);
    getDesktopCredentials(): string;
    registerDesktopUser(body: DesktopNotifBody, userId: number): Promise<DesktopNotifPartial>;
    deleteDesktopUser(deviceId: number, userId: number): Promise<void>;
    verifyPhoneUser(body: TwilioBody, twilioSignature: string): Promise<string>;
}
