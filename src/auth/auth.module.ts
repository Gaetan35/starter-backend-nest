import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService, ServiceConfigModule } from 'libs/config/src';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticationStrategy } from './authentication.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ServiceConfigModule],
      useFactory: (configService: ApiConfigService) =>
        configService.getJwtConfig(),
      inject: [ApiConfigService],
    }),
    ServiceConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthenticationStrategy],
})
export class AuthModule {}
