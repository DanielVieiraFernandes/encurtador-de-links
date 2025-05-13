import { Injectable } from '@nestjs/common';
import { LinksRepository } from './repositories/links-repository';
import { EnvService } from 'src/infra/env/env.service';
import { ClickCountsRepository } from 'src/infra/redis/repositories/click-counts-repository';

@Injectable()
export class LinkService {
  constructor(
    private readonly linksRepository: LinksRepository,
    private env: EnvService,
    private readonly clickCountsRepository: ClickCountsRepository,
  ) {}

  async createShortLink(originalUrl: string) {
    const shortUrl = this.generateShortUrl();

    await this.linksRepository.create(originalUrl, shortUrl);

    return {
      shortUrl,
    };
  }

  async findByCode(code: string, ip: string) {
    const linkInfo = await this.linksRepository.findByCode(code);

    if (!linkInfo) {
      throw new Error('URL does not exists');
    }

    const thisIpExists = await this.clickCountsRepository.get(
      `link:${code}:counts:${ip}`,
    );

    if (thisIpExists) {
      return linkInfo.originalUrl;
    }

    const linkCounts = await this.clickCountsRepository.get(
      `link:${code}:counts`,
    );

    await Promise.all([
      this.clickCountsRepository.set(
        `link:${code}:counts`,
        JSON.stringify(linkCounts ? Number(linkCounts) + 1 : 1),
      ),
      this.clickCountsRepository.set(`link:${code}:counts:${ip}`, ip),
    ]);

    return linkInfo.originalUrl;
  }

  async returnCounts(code: string, ip: string): Promise<number> {
    const link = await this.linksRepository.findByCode(code);

    if (!link) {
      throw new Error();
    }

    const linkCounts = await this.clickCountsRepository.get(
      `link:${code}:counts`,
    );

    if (!linkCounts) {
      return 0;
    }

    return Number(linkCounts);
  }

  private generateShortUrl() {
    const code = Math.random().toString(36).substring(2, 8);

    const shortUrl = this.env.get('URL') + '/' + code;

    return shortUrl;
  }
}
