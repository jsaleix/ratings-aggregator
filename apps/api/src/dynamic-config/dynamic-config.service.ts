import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class DynamicConfigService {
  public static readonly MAX_REQUESTS_KEY = 'max_requests';
  private cache = new Map<string, string>();

  constructor(private readonly prismaService: PrismaService) {}

  private async get(key: string): Promise<string | null> {
    if (this.cache.has(key)) return this.cache.get(key) || null;
    const config = await this.prismaService.app_Config.findUnique({
      where: { key },
    });

    if (config) {
      this.cache.set(key, config.value);
      return config.value;
    }
    return null;
  }

  private async set(key: string, value: string) {
    const res = await this.prismaService.app_Config.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    this.cache.set(key, value);
    return res.value;
  }

  async getMaxRequests(): Promise<number | null> {
    const val = await this.get(DynamicConfigService.MAX_REQUESTS_KEY);
    console.log(val)
    if (val === null) return null;
    return +val;
  }

  async setMaxRequests(value: number): Promise<number | null> {
    const val = await this.set(
      DynamicConfigService.MAX_REQUESTS_KEY,
      value.toString(),
    );
    if (val === null) return null;
    return Number(value);
  }
}
