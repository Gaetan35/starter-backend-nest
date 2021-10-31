import { validateSync, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class ValueObject {
  protected validate(toValidate: any) {
    const validationErrors: ValidationError[] = validateSync(toValidate);
    if(validationErrors.length) validationErrors.forEach(error => {
      throw new BadRequestException(error.toString());
    });
  }
}
