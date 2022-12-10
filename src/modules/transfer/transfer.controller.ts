import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDocument } from '../user/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TransferService } from './transfer.service';

@Controller('transfer')
export class TransferController {
    constructor(private readonly transferService: TransferService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/history/:id')
    get(@Param("id") id: UserDocument["_id"]) {

        return this.transferService.mostRecentMoneyReceived(id);
    };

};
