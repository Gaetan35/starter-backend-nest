import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './authentication-guard.service';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [RolesGuard, AuthenticationGuard],
  exports: [RolesGuard, AuthenticationGuard],
})
export class CommonModule {}
