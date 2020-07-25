import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';

/**
 * A wrapper around twilio SDK to make testing easier.
 * Should NOT interact with DB models or do anything smart. Just wrap Twilio.
 */
@Injectable()
export class TwilioService {
  private twilioClient: twilio.Twilio;

  constructor(private configService: ConfigService) {
    this.twilioClient = twilio(
      this.configService.get('TWILIOACCOUNTSID'),
      this.configService.get('TWILIOAUTHTOKEN'),
    );
  }

  /**
   * Check that phone number is real
   */
  public async isPhoneNumberReal(phoneNumber: string): Promise<boolean> {
    try {
      await this.twilioClient.lookups.phoneNumbers(phoneNumber).fetch();
      return true;
    } catch (err) {
      // if the phone number is not found, then endpoint should return invalid
      return false;
    }
  }

  /**
   * Send SMS to phone number using our Twilio number
   */
  public async sendSMS(phoneNumber: string, message: string): Promise<void> {
    await this.twilioClient.messages.create({
      body: message,
      from: this.configService.get('TWILIOPHONENUMBER'),
      to: phoneNumber,
    });
  }
}
