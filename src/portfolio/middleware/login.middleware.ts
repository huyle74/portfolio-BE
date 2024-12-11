import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();
const user = process.env.USER,
  pass = process.env.PASSWORD,
  url = process.env.client_URL;

@Injectable()
export class LoginMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    console.log(req.body);

    if (username === user && password === pass) {
      console.log('Login successfully!');
      return res.redirect(`${url}/admin`);
    }
  }
}
