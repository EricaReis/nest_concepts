import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return 'return';
  }

  @Get('example')
  example() {
    return this.appService.getExample();
  }
}
