import { IsArray, IsString, Validate, ValidateNested } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';
import { Type } from 'class-transformer';
import { TaskDto } from '../../task/dto';

export class ColumnDto {
  @Validate(IsObjectId)
  id: string;

  @Validate(IsObjectId)
  dashboard: string;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested()
  @Type(() => TaskDto)
  tasks: TaskDto[];
}
