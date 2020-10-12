import { TwilioService } from 'notification/twilio/twilio.service';
export declare class BackfillPhoneNotifs {
    private twilioService;
    constructor(twilioService: TwilioService);
    fix(): Promise<void>;
}
