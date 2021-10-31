import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

import { dbConfig } from './db.config';

class DbConfigService {
  private defaultConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    url: dbConfig.url,
    autoLoadEntities: true,
    synchronize: false,
    ssl: this.getSSLConfig(),
    logging: true,
  };

  private isDevelopment() {
    return dbConfig.env === 'development';
  }

  private getSSLConfig() {
    if (this.isDevelopment()) return false;

    return { rejectUnauthorized: false };
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.defaultConfig;
  }

  getTypeOrmCliConfig(): TypeOrmModuleOptions {
    return {
      ...this.defaultConfig,
      migrationsTableName: 'migration',
      migrations: ['libs/database/src/migrations/*.ts'],
      cli: {
        migrationsDir: 'libs/database/src/migrations',
      },
    };
  }
}

export const dbConfigService = new DbConfigService();
