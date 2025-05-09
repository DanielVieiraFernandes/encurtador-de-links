import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LinksRepository } from 'src/http/link/repositories/links-repository';
import { PrismaLinksRepository } from './repositories/prisma-links-repository';

@Module({
  providers: [
    PrismaClient,
    {
      provide: LinksRepository,
      useClass: PrismaLinksRepository,
    },
  ],
  exports: [PrismaClient, LinksRepository],
})
export class DatabaseModule {}
