import * as bcrypt from 'bcrypt';
import { ValueObject } from './value-object';
import { PasswordValidationError } from '../exceptions/password-validation-error';

export class HashedPassword extends ValueObject {
  hash: string;

  private constructor(hash: string) {
    super();
    this.hash = hash;
  }

  static async hash(password: string): Promise<HashedPassword> {
    return new HashedPassword(await bcrypt.hash(password, 10));
  }

  static alreadyHashed(hashedPassword: string): HashedPassword {
    return new HashedPassword(hashedPassword);
  }

  public async matches(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.hash);
  }
}
