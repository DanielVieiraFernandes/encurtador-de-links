import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appSetup, swaggerSetup } from './app/app.setup';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  appSetup(app);
  swaggerSetup(app);

  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`📄 Swagger disponível em: http://localhost:3333/api`);
}
bootstrap();
