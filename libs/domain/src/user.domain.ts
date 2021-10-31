import { DBUser } from '@backend/database';
import { DomainEntity } from './common/domain-entity';
import { Email } from './valueObjects/email.value-object';
import { HashedPassword } from './valueObjects/hashed-password.value-object';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDTO = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export class User extends DomainEntity {
  private constructor(
    id: string,
    public name: string,
    public email: Email,
    public passwordHash: HashedPassword,
    public role: UserRole,
  ) {
    super();
    this.id = id;
  }

  static async createUserWithPassword(params: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
  }) {
    return new User(
      params.id,
      params.name,
      new Email(params.email),
      await HashedPassword.hash(params.password),
      params.role,
    );
  }

  public toDBEntity(): DBUser {
    return new DBUser(
      this.id,
      this.name,
      this.email.address,
      this.passwordHash.hash,
      this.role,
    );
  }

  public static fromDBEntity(dbUser: DBUser): User {
    return new User(
      dbUser.id,
      dbUser.name,
      new Email(dbUser.email),
      HashedPassword.alreadyHashed(dbUser.passwordHash),
      dbUser.role,
    );
  }

  public toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
      email: this.email.address,
      role: this.role,
    };
  }
}
