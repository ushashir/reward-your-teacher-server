import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendWelcomeEmail(to: string, name: string) {
    return this.mailerService.sendMail({
      to,
      subject: 'Welcome to Reward your teacher platform',
      template: 'welcome',
      context: {
        name,
        email: to,
      },
    });
  }
}
