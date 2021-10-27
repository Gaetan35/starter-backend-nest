import { Injectable } from '@nestjs/common';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

@Injectable()
export class UserService {
  async createOne(email: string, password: string): Promise<User> {
    return {
      id: 'id',
      email: 'mail@mail.com',
      passwordHash: 'password',
      role: UserRole.USER,
    };
  }

  async getById(id: string): Promise<User> {
    return {
      id: 'id',
      email: 'mail@mail.com',
      passwordHash: 'password',
      role: UserRole.USER,
    };
  }

  async getOne(email: string): Promise<User | undefined> {
    return {
      id: 'id',
      email: 'mail@mail.com',
      passwordHash: 'password',
      role: UserRole.USER,
    };
  }
}
