import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly configService: ConfigService) {}

  // @Cron('5 * * * * *')
  @Interval(14 * 1000)
  async pingHealthCheck() {
    this.logger.log('Cron job ran');
  }
}
