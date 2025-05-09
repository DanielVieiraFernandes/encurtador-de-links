import { Injectable } from '@nestjs/common';
import { LinksRepository } from './repositories/links-repository';
import { EnvService } from 'src/infra/env/env.service';

@Injectable()
export class LinkService {
  constructor(
    private readonly linksRepository: LinksRepository,
    private env: EnvService,
  ) {}

  async createShortLink(originalUrl: string) {
    const shortUrl = this.generateShortUrl();

    await this.linksRepository.create(originalUrl, shortUrl);

    return {
      shortUrl,
    };
  }

  async findByCode(code: string) {
    const originalUrl = await this.linksRepository.findByCode(code);

    if (!originalUrl) {
      throw new Error('URL does not exists');
    }

    return originalUrl;
  }

  private generateShortUrl() {
    const code = Math.random().toString(36).substring(2, 8);

    const shortUrl = this.env.get('URL') + '/' + code;

    return shortUrl;
  }
}
