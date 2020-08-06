import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as apm from 'elastic-apm-node';

@Injectable()
export class ApmInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof HttpException) {
          apm.captureError(error.message);
        } else {
          apm.captureError(error);
        }
        throw error;
      }),
    );
  }
}
