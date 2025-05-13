import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ClickCountsRepository } from './repositories/click-counts-repository';

@Injectable()
export class RedisClickCountsRepository implements ClickCountsRepository {
  constructor(private readonly redis: RedisService) {}

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
