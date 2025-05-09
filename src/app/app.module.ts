import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from 'src/http/link/links.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validate: env => {

          //lógica com class-validator e class-transformer

          return env;
        }
      }),
    LinksModule],
})
export class AppModule {}
