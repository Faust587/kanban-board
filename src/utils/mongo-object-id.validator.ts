import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'customText', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
  validate(id: string) {
    return Types.ObjectId.isValid(id);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an ID type`;
  }
}
