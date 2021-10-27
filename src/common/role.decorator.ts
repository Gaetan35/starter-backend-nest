import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/user/user.service';

export const ROLES_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLES_KEY, role);
