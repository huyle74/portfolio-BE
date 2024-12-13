import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
dotenv.config();

const username = process.env.USER;
const password = process.env.PASSWORD;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: string, pass: string): Promise<{ access_token: string }> {
    console.log(username, password);

    if (user !== username || pass !== password) {
      throw new UnauthorizedException();
    } else {
      const payload = { username: username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
