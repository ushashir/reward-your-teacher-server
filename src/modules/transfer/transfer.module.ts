import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppreciationService } from '../appreciation/appreciation.service';
import { Transfer, TransferSchema } from './schemas/transfer.schema';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transfer.name,
        schema: TransferSchema,
      },
    ]),
  ],
  controllers: [TransferController],
  providers: [TransferService, AppreciationService],
  exports: [TransferService],
})
export class TransferModule {}
