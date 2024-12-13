import {
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Controller,
  Get,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>) {
    this.logger.log(`Login attempt for user: ${signInDto.username}`);
    try {
      return await this.authService.login(
        signInDto.username,
        signInDto.password,
      );
    } catch (error) {
      this.logger.error(`Failed login attempt for user: ${signInDto.username}`);
      throw error;
    }
  }

  @Get('/')
  GetAuth() {
    return 'Auth Controller Get Trigger!!';
  }
}
