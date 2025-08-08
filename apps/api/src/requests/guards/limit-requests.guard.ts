import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { DynamicConfigService } from 'src/dynamic-config/dynamic-config.service';
import { RequestsService } from '../requests.service';
import { roles } from 'src/core/constants/auth';

@Injectable()
export class LimitRequestsGuard implements CanActivate {
  constructor(
    private dynamicConfigService: DynamicConfigService,
    // private reflector: Reflector,
    private requestService: RequestsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { user } = context.switchToHttp().getRequest();
      if (!user) {
        throw new UnauthorizedException('User not authenticated');
      }
      if (user.role === roles.ADMIN) return true;

      const maxRequests = await this.dynamicConfigService.getMaxRequests();
      if (maxRequests === null) {
        throw new UnauthorizedException('Max requests limit not set');
      }

      const requestsCount =
        await this.requestService.getRequestsCountOfTheToday();
      if (requestsCount >= maxRequests) {
        throw new UnauthorizedException('Max requests limit reached for today');
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
