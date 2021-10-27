import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ApiConfigService } from 'libs/config/src';
import { UserRole } from 'src/user/user.service';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly apiConfigService: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: apiConfigService.getJwtConfig().secret,
    });
  }

  async validate(
    payload: any,
  ): Promise<{ userId: number; userRole: UserRole }> {
    return { userId: payload.userId, userRole: payload.userRole };
  }
}
