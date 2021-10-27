import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenResponse } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<TokenResponse> {
    const user = await this.userService.getOne(email);
    if (!user || user.passwordHash !== password) {
      throw new BadRequestException('Email or password incorrect');
    }

    const token = this.jwtService.sign({
      userId: user.id,
      userRole: user.role,
    });
    return { access_token: token };
  }
}
