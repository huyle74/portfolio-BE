import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PortfolioModule } from './portfolio/portfolio.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(PortfolioModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
