import { IsObjectId } from '../../../utils/mongo-object-id.validator';
import { IsArray, IsString, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ColumnDto } from '../../column/dto/column.dto';

export class DashboardDto {
  @Validate(IsObjectId)
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested()
  @Type(() => ColumnDto)
  columns: ColumnDto[];
}
