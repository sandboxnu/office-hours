import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const start = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(
            `${req.method} ${req.path} ${res.statusCode} ${
              Date.now() - start
            } ms`,
          ),
        ),
      );
  }
}
