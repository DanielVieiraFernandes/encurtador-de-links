import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { LinkController } from '../controllers/link.controller';
import { EnvService } from 'src/infra/env/env.service';
import { RedisModule } from 'src/infra/redis/redis.module';

@Module({
  imports: [DatabaseModule, RedisModule],
  providers: [LinkService, EnvService],
  controllers: [LinkController],
  exports: [LinkService],
})
export class LinksModule {}
