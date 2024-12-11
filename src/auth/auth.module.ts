import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: jwtConstants.secret,
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
