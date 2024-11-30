import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Portfolio } from './portfolio.entity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'portfolio',
      entities: [Portfolio, User],
      synchronize: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([Portfolio]),
    MulterModule.register({dest:'./uploadfile'})
  ],

  controllers: [PortfolioController, UserController],
  providers: [PortfolioService],
})
export class PortfolioModule {
  constructor(private dataSource: DataSource) {}
}
