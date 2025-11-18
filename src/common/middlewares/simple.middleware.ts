import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        name: 'Erica',
        lastname: 'Reis',
      };
    }

    res.setHeader('Header', 'from Middleware');

    next(); //next middleware

    res.on('finish', () => {
      console.log('SimpleMiddleware: Finished');
    });
  }
}
