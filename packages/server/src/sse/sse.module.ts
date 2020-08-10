import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { SSEService } from './sse.service';
import { SSEMiddleware } from './sse.middleware';

@Module({ providers: [SSEService, SSEMiddleware], exports: [SSEService] })
export class SSEModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(SSEMiddleware)
    //   .forRoutes({ path: '/queues/:queueId/sse', method: RequestMethod.GET });
  }
}
