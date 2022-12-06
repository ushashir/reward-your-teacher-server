import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorators';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AppreciationService } from './appreciation.service';
import { sendAppreciationDto } from './dtos/SendAppreciationDto';

@Controller('appreciation')
export class AppreciationController {
    constructor( private readonly appreciationService: AppreciationService){}

    @UseGuards(JwtAuthGuard)
    @Post('/send')
    sendAppreciation(@Body() { transactionId }: sendAppreciationDto, @GetUser() user) {
        return this.appreciationService.sendAppreciation(user, transactionId)
    }
}
