import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterception implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();

    console.log('TimingConnectionInterception executed! BEFORE');

    await new Promise(resolve => setTimeout(resolve, 3000));
    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsed = finalTime - startTime;

        console.log(
          `TimingConnectionInterception executed! Takes ${elapsed}ms to execute`,
        );
      }),
    );
  }
}
