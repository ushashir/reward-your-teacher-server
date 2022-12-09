import { IsMongoId } from "class-validator";


export class sendAppreciationDto {
    @IsMongoId()
    transactionId: string;
}
