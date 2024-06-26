import { Validate } from 'class-validator';
import { IsObjectId } from '../../../utils/mongo-object-id.validator';

export class ChangeColumnDto {
  @Validate(IsObjectId)
  columnId: string;
}
