import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
import { EnvService } from 'src/infra/env/env.service';

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(env: EnvService) {
    super({
      host: env.get('REDIS_HOST'),
      port: env.get('REDIS_PORT'),
      db: env.get('REDIS_DB'),
    });
  }

  async onModuleDestroy() {
    return this.disconnect();
  }
}
