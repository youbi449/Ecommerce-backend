import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    var { token } = req.headers;
    if (!token) {
      throw new HttpException('Missing token', HttpStatus.UNAUTHORIZED);
    }
    //@ts-ignore
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT);
    // @ts-ignore
    req.headers.userId = decodedToken.data.id;
    next();
  }
}
