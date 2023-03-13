import {
  asyncQuestionEventType,
  ERROR_MESSAGES,
  sendEmailAsync,
} from '@koh/common';
import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(url: string, receiver: string): Promise<void> {
    await this.mailerService.sendMail({
      to: receiver,
      from: '"UBC HelpMe" <support@example.com>', // override default from
      subject: 'Click the following link to reset your password',
      text: `${url}`,
    });
  }

  async sendEmail(emailPost: sendEmailAsync): Promise<void> {
    let text = null;
    if (emailPost.type === asyncQuestionEventType.answered) {
      text = 'Your async question is answered on UBC helpme';
    } else if (emailPost.type === asyncQuestionEventType.deleted) {
      text = 'Your async question has been deleted by the professor';
    } else if (emailPost.type === asyncQuestionEventType.created) {
      text = 'Async question created on UBC helpme ';
    }
    if (!text) {
      throw new BadRequestException();
    }
    await this.mailerService
      .sendMail({
        to: emailPost.receiver,
        from: '"UBC helpme support" <support@example.com>', // override default from
        subject: emailPost.subject,
        text: text + '\n Check on :  https://help.cosc304.ok.ubc.ca',
      })
      .catch(() => {
        throw new HttpException(
          ERROR_MESSAGES.mailService.mailFailed,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
