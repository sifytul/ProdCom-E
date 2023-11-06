import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsRatingValidator', async: false })
export class IsRatingValidator implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    return value > 0 && value <= 5;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Rating should be between 1 and 5';
  }
}
