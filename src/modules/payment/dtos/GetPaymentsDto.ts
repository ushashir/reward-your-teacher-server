import { Validate } from 'class-validator';
import { PaginationDto } from '../../../common/dto';
import { SortQueryConstraint } from '../../../common/validations/sort.validation';

export class GetPaymentsDto extends PaginationDto {
  @Validate(SortQueryConstraint, ['createdAt'])
  sort?: string;
}
