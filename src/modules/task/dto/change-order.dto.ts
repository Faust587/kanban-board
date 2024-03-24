import { IsNumber, IsOptional, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class ChangeOrderDto {
  @IsOptional()
  @Validate(IsObjectId)
  columnId: string;

  @IsNumber()
  index: number;
}
