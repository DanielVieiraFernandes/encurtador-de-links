import { Link } from '@prisma/client';

export abstract class LinksRepository {
  abstract create(originalUrl: string, shortUrl: string): Promise<void>;
  abstract findByCode(code: string): Promise<Link | null>;
}
