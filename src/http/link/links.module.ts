import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { DatabaseModule } from 'src/infra/database/database.module';
import { LinkController } from '../controllers/link.controller';
import { EnvService } from 'src/infra/env/env.service';

@Module({
  imports: [DatabaseModule],
  providers: [LinkService, EnvService],
  controllers: [LinkController],
  exports: [LinkService],
})
export class LinksModule {}
