import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const user = configService.get('GMAIL_USER');
        const pass = configService.get('GMAIL_PASS');
        const from = configService.get('FROM');

        return {
          transport: {
            service: 'gmail',
            secure: true,
            auth: {
              user,
              pass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from,
          },
          preview: true,
          template: {
            dir: path.join(__dirname + '../../../templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
