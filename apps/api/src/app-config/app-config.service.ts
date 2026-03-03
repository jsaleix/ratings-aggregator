import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class AppConfigService {
  constructor(private readonly prismaService: PrismaService) {}

  async get(key: string): Promise<string | null> {
    const entry = await this.prismaService.app_Config.findUnique({
      where: { key },
    });
    return entry?.value ?? null;
  }

  async set(key: string, value: string) {
    const res = await this.prismaService.app_Config.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return res.value;
  }
}
