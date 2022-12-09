import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorMessages } from 'src/common/constants';
import { UserRolesEnum } from 'src/common/enums';
import { TransferDocument } from '../transfer/interfaces/transfer.interface';
import { Transfer } from '../transfer/schemas/transfer.schema';
import { TransferService } from '../transfer/transfer.service';
import { UserDocument } from '../user/user.interface';

@Injectable()
export class AppreciationService {
    constructor(
       private readonly transferService: TransferService
    ) { }


    async sendAppreciation(user: UserDocument, transactionId: string){
        if (user.userType !== UserRolesEnum.TEACHER) {
            throw new BadRequestException(ErrorMessages.STUDENT_CANNOT_SEND_APPRECIATION);
        }

        const checkAppreciation = await this.transferService.transferModel.findOne({ _id: transactionId })
        
        if (checkAppreciation.appreciation === true) {
            throw new BadRequestException(ErrorMessages.APPRECIATION_CAN_ONLY_BE_SENT_ONCE)
        }

        const transferRecord = await this.transferService.transferModel.findByIdAndUpdate(transactionId, {
            appreciation: true
        }, {new: true})

        return {
            message: 'Appreciation sent successfully',
            transferRecord
        }
    }
}

