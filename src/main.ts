import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appSetup, swaggerSetup } from './app/app.setup';
import { Logger } from '@nestjs/common';
import { EnvService } from './infra/env/env.service';
import { Express } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressApp = app.getHttpAdapter().getInstance() as Express;
  // expressApp.set('trust proxy', true);

  const env = app.get(EnvService);
  const port = env.get('PORT');

  appSetup(app);
  swaggerSetup(app);

  await app.listen(port);

  Logger.log(`📄 Swagger disponível em: http://localhost:3333/api`);
}
bootstrap();
