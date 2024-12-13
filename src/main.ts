import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { PortfolioModule } from './portfolio/portfolio.module';

dotenv.config();
declare const module: any;

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Huyen Vo Portfolio')
    .setDescription('The Portfolio API description')
    .setVersion('1.0')
    .addTag('Portfolio')
    .build();
  const app = await NestFactory.create<NestExpressApplication>(PortfolioModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3030, '0.0.0.0');

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
