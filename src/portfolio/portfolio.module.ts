import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as dotenv from 'dotenv';

import { AuthModule } from 'src/auth/auth.module';
import { Portfolio } from './portfolio.entity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { GoogleServiceStorage } from './core/google.storage';

dotenv.config();

console.log(
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.DB_DATABASE,
);

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_DATABASE || 'portfolio',
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
export class PortfolioModule {
  constructor(private dataSource: DataSource) {}
}
