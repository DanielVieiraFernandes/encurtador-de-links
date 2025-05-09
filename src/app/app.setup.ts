import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const appSetup = (app: INestApplication) => {
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
}

export const swaggerSetup = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Encurtador de Link')
        .setDescription('Aplicação de encurtador de link')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}