import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisClickCountsRepository } from './redis-click-counts-repository';
import { ClickCountsRepository } from './repositories/click-counts-repository';
import { EnvService } from '../env/env.service';

@Module({
  providers: [
    RedisService,
    EnvService,
    {
      provide: ClickCountsRepository,
      useClass: RedisClickCountsRepository,
    },
  ],
  exports: [ClickCountsRepository, RedisService],
})
export class RedisModule {}
