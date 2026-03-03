import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { roles } from 'src/core/constants/auth';
import { RequestsQuotaService } from '../services/requests-quota.service';

@Injectable()
export class LimitRequestsGuard implements CanActivate {
  constructor(
    // private reflector: Reflector,
    private requestsQuotaService: RequestsQuotaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { user } = context.switchToHttp().getRequest();
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
      if (user.role === roles.ADMIN) return true;

      const { current, max } =
        await this.requestsQuotaService.getCurrentQuota();
      if (max === null) {
        throw new UnauthorizedException('Max requests limit not set');
      }

      if (current >= max) {
        throw new UnauthorizedException('Max requests limit reached for today');
      }
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
