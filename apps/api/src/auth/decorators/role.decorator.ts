import { SetMetadata } from '@nestjs/common';
import { type RoleType } from 'src/core/constants/auth';

export const ROLE_KEY = 'role';
export const Role = (...roles: RoleType[]) => SetMetadata(ROLE_KEY, roles);
