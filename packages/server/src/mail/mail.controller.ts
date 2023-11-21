import { MailService } from './mail.service';
import { Controller, Body, Post } from '@nestjs/common';
import { sendEmailAsync } from '@koh/common';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  // postAsyncStatus(message)
  @Post('sendEmail')
  async sendEmail(@Body() emailPost: sendEmailAsync): Promise<void> {
    await this.mailService.sendEmail(emailPost);
  }
}
