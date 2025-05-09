import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LinkService],
  exports: [LinkService],
})
export class LinksModule {}
