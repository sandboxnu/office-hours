import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import * as Constants from '@nestjs/common/constants';
import * as Sentry from '@sentry/minimal';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ApmInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.addRouteToSentry(context);
    return next.handle().pipe(
      tap(null, (exception) => {
        Sentry.captureException(exception);
      }),
    );
  }

  addRouteToSentry(context: ExecutionContext) {
    // Sentry has issues grouping transactions by route. (as of 12/14/2020)
    // ex: /courses/1 and /courses/2 end up two different transactions.
    // This code groups them both to /courses/:id using nest.js
    // From https://forum.sentry.io/t/can-transactions-be-grouped/11403/15
    const scope = Sentry.getCurrentHub().getScope();
    if (scope) {
      const transaction = scope.getTransaction();
      if (transaction) {
        const classPath: string = this.reflector.get<string>(
          Constants.PATH_METADATA,
          context.getClass(),
        );
        const handlerPath: string = this.reflector.get<string>(
          Constants.PATH_METADATA,
          context.getHandler(),
        );
        const method = context.switchToHttp().getRequest().method;
        transaction.name = `${method} /api/v1/${classPath}/${handlerPath}`;
      }
    }
  }
}
