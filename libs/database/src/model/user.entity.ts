import { UserRole } from '@backend/domain';
import { Column, Entity } from 'typeorm';
import { DatabaseEntity } from './database-entity';

export const userTableName = 'users';

@Entity({ name: userTableName })
export class DBUser extends DatabaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  public constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = password;
    this.role = role;
  }
}
