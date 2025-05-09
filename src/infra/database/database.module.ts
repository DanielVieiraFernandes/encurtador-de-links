import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LinksRepository } from 'src/http/link/repositories/links-repository';
import { PrismaLinksRepository } from './repositories/prisma-links-repository';
import { PrismaService } from './prisma.service';
import { EnvService } from '../env/env.service';

@Module({
  providers: [
    PrismaService,
    EnvService,
    {
      provide: LinksRepository,
      useClass: PrismaLinksRepository,
    },
  ],
  exports: [PrismaService, LinksRepository],
})
export class DatabaseModule {}
