import { IsOptional, IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class TaskDto {
  @Validate(IsObjectId)
  id: string;

  @Validate(IsObjectId)
  column: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}
