import { IsNumber, IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class CreateColumnDto {
  @IsString()
  name: string;

  @Validate(IsObjectId)
  dashboard: string;

  @IsNumber()
  index: number;
}
