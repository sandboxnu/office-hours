import { ConfigService } from '@nestjs/config';
export declare class TwilioService {
    private configService;
    private twilioClient;
    constructor(configService: ConfigService);
    getFullPhoneNumber(phoneNumber: string): Promise<string | false>;
    sendSMS(phoneNumber: string, message: string): Promise<void>;
}
