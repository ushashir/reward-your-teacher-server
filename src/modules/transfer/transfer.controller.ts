import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetUser } from '../../common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LeanUser } from '../user/user.interface';
import { GetTransfersDto } from './dtos/GetTransfersDto';
import { TransferService } from './transfer.service';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getTransfers(
    @GetUser() user: LeanUser,
    @Query() query: GetTransfersDto,
  ) {
    return this.transferService.getTransfers(user, query);
  }
}
