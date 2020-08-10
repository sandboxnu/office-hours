import { Injectable, NestMiddleware } from '@nestjs/common';
import { SSEService } from './sse.service';

@Injectable()
export class SSEMiddleware implements NestMiddleware {
  constructor(private sseService: SSEService) {
    this.sseService = sseService;
  }

  use(req, res, next) {
    // res.set({
    //     "Content-Type": "text/event-stream",
    //     "Cache-Control": "no-cache",
    //     "Connection": "keep-alive",
    // });
    // this.sseService.subscribeClient(`q-${req.params.queueId}`, res);
    // next()
  }
}
