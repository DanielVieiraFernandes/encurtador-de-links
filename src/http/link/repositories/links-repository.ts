export abstract class LinksRepository {
  abstract create(originalUrl: string, shortUrl: string): Promise<void>;
}
