import { Injectable } from '@nestjs/common';
import { LinksRepository } from './repositories/links-repository';

@Injectable()
export class LinkService {
  constructor(private readonly linksRepository: LinksRepository) {}

  async createShortLink() {}
}
