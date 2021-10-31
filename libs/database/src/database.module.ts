import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigService } from './config/dbConfig.service';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig())],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
