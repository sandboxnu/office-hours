import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(url: string, receiver: string): Promise<void> {
    await this.mailerService.sendMail({
      to: receiver,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Click the following link to reset your password',
      text: `${url}`,
    });
  }
}
