import { Injectable } from '@nestjs/common';
import { DynamicConfigService } from 'src/dynamic-config/dynamic-config.service';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RequestsQuotaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dynamicConfigService: DynamicConfigService,
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

  async getCurrentQuota(): Promise<{
    current: number;
    max: number | null;
    left: number | null;
  }> {
    const current = await this.getCountForToday();
    const max = await this.dynamicConfigService.getMaxRequests();
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
