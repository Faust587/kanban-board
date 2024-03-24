import { IsOptional, IsString, Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class UpdateTaskDto {
  @IsOptional()
  @Validate(IsObjectId)
  columnId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  index: number;
}
