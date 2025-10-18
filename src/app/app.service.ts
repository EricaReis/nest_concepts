import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getExample(): string {
    return 'This is an example service method.';
  }
}
