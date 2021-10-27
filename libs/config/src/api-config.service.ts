import { Injectable } from '@nestjs/common';

import { apiConfig } from './api.config';

@Injectable()
export class ApiConfigService {
  getJwtConfig() {
    return {
      secret: apiConfig.jwtSecret,
      signOptions: { expiresIn: apiConfig.jwtExpiresIn },
    };
  }
}
