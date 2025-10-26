import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  constructor(private readonly messagesService: MessagesService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('AddInterceptorHeader executed!');

    const response = context.switchToHttp().getResponse();

    const message = await this.messagesService.findOne(28);

    console.log(message);

    response.setHeader('X-Custom-Header', 'Header value');

    return next.handle();
  }
}
