import { Module } from '@nestjs/common';
import { TransferModule } from '../transfer/transfer.module';
import { TransferService } from '../transfer/transfer.service';
import { AppreciationController } from './appreciation.controller';
import { AppreciationService } from './appreciation.service';

@Module({
  imports: [TransferModule],
  providers: [AppreciationService],
  controllers: [AppreciationController],
})
export class AppreciationModule {}
