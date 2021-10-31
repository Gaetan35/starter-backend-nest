import { IsEmail } from 'class-validator';
import { ValueObject } from './value-object';

export class Email extends ValueObject {
  @IsEmail()
  address: string;

  constructor(email: string) {
    super();
    this.address = email.toLowerCase();
    this.validate(this);
  }
}
