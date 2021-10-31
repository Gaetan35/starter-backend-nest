import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './authentication-guard.service';
import { IdGeneratorService } from './id-generator.service';
import { RolesGuard } from './roles.guard';

@Module({
  providers: [RolesGuard, AuthenticationGuard, IdGeneratorService],
  exports: [RolesGuard, AuthenticationGuard, IdGeneratorService],
})
export class CommonModule {}
