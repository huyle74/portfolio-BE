import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';

import { AuthModule } from 'src/auth/auth.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { Portfolio } from './portfolio.entity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { LoginMiddleWare } from './middleware/login.middleware';
import { GoogleServiceStorage } from './core/google.storage';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'portfolio',
      entities: [Portfolio],
      synchronize: true,
    }),
    AuthModule,
    TypeOrmModule.forFeature([Portfolio]),
    MulterModule.register({ storage: multer.memoryStorage() }),
  ],

  controllers: [PortfolioController],
  providers: [PortfolioService, GoogleServiceStorage],
})
export class PortfolioModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleWare).forRoutes('portfolio/login');
  }
}
