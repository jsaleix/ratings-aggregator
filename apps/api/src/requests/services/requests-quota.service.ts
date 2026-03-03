import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { AppConfigService } from 'src/app-config/app-config.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RequestsQuotaService {
  public static readonly MAX_REQUESTS_KEY = 'max_requests';

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly prisma: PrismaService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async getCountForToday(): Promise<number> {
    return await this.prisma.movie_Request.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
  }

  async getRequestsCountOfTheToday(): Promise<number> {
    return await this.prisma.movie_Request.count({
      where: {
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
  }

  async setMaxRequests(value: number) {
    const res = await this.appConfigService.set(
      RequestsQuotaService.MAX_REQUESTS_KEY,
      value.toString(),
    );

    await this.cacheManager.set<number>(
      RequestsQuotaService.MAX_REQUESTS_KEY,
      value,
    );
    return +res;
  }

  private async getMaxRequests() {
    const cachedValue = await this.cacheManager.get<number>(
      RequestsQuotaService.MAX_REQUESTS_KEY,
    );
    if (cachedValue) return cachedValue;
    const rawValue = await this.appConfigService.get(
      RequestsQuotaService.MAX_REQUESTS_KEY,
    );
    if (rawValue === null) return null;
    const val = +rawValue;
    await this.cacheManager.set(
      RequestsQuotaService.MAX_REQUESTS_KEY,
      val,
      1000 * 60 * 60,
    );
    return val;
  }

  async getCurrentQuota(): Promise<{
    current: number;
    max: number | null;
    left: number | null;
  }> {
    const current = await this.getCountForToday();
    const max = await this.getMaxRequests();
    let left = max !== null ? max - current : null;
    if (left !== null && left < 0) {
      left = 0; // Ensure left is not negative
    }

    return {
      current,
      max,
      left,
    };
  }
}
