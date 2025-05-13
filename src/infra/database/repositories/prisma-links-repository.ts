import { Injectable } from '@nestjs/common';
import { LinksRepository } from 'src/http/link/repositories/links-repository';
import { PrismaService } from '../prisma.service';
import { EnvService } from 'src/infra/env/env.service';
import { ClickCountsRepository } from 'src/infra/redis/repositories/click-counts-repository';
import { Link } from '@prisma/client';

@Injectable()
export class PrismaLinksRepository implements LinksRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly env: EnvService,
  ) {}

  async create(originalUrl: string, shortUrl: string): Promise<void> {
    await this.prisma.link.create({
      data: {
        originalUrl,
        shortUrl,
      },
    });
  }

  async findByCode(code: string): Promise<Link | null> {
    const shortUrl = this.env.get('URL') + '/' + code;

    const linkInfo = await this.prisma.link.findUnique({
      where: {
        shortUrl,
      },
    });

    if (!linkInfo) {
      return null;
    }


    return linkInfo;
  }
}
