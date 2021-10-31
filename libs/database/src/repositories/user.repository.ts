import { EntityRepository, Repository } from 'typeorm';
import { DBUser } from '@backend/database';
import { User, UserNotFoundException } from '@backend/domain';

@EntityRepository(DBUser)
export class UserRepository extends Repository<DBUser> {
  async save_(user: User): Promise<User> {
    return User.fromDBEntity(await super.save(user.toDBEntity()));
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return User.fromDBEntity(await this.findOneOrFail({ email }));
    } catch (e) {
      throw new UserNotFoundException();
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return User.fromDBEntity(await this.findOneOrFail({ id }));
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
}
