import { Injectable } from '@nestjs/common';
import { LinksRepository } from 'src/http/link/repositories/links-repository';

@Injectable()
export class PrismaLinksRepository implements LinksRepository {
  async create(originalUrl: string, shortUrl: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
