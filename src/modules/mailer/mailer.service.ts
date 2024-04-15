import { Injectable } from '@nestjs/common';
import * as Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
@Injectable()
export class MailerService {
  private transporter: Mail;
  constructor(
    private configService: ConfigService,
  ) {
    const transport: SMTPTransport.Options = {
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      }
    }

    const defaults = {
      from: `No Reply <${this.configService.get('EMAIL_FROM')}>`
    }

    this.transporter = createTransport(transport, defaults);
  }

  sendMail(options: Mail.Options) {
    return this.transporter.sendMail(options);
  }
}
