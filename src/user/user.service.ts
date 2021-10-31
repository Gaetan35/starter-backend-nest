import { UserRepository } from '@backend/database';
import { HashedPassword, User, UserRole } from '@backend/domain';
import { Injectable } from '@nestjs/common';
import { IdGeneratorService } from 'src/common/id-generator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  async createOne(email: string, password: string): Promise<User> {
    const user = await User.createUserWithPassword({
      id: this.idGeneratorService.new(),
      email,
      name: email,
      password: password,
      role: UserRole.USER,
    });
    return await this.userRepository.save_(user);
  }

  async getById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }
}
