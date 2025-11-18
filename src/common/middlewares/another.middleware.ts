import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AnotherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AnotherMiddleware: Hi');
    const authorization = req.headers?.authorization;

    if (authorization) {
      req['user'] = {
        nome: 'Erica',
        sobrenome: 'Reis',
      };
    }

    res.setHeader('HEADER', 'FROM Middleware');

    // Ending call chain
    // return res.status(404).send({
    //   message: 'Not found',
    // });

    next(); //next middleware
  }
}
