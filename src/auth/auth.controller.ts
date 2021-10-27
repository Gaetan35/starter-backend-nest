import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

export interface TokenResponse {
  access_token: string;
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/login')
  async login(@Body() loginDTO: LoginDTO): Promise<TokenResponse> {
    return await this.service.login(loginDTO.email, loginDTO.password);
  }
}
