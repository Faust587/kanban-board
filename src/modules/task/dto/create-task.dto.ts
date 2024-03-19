import { IsOptional, IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class CreateTaskDto {
  @Validate(IsObjectId)
  columnId: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
