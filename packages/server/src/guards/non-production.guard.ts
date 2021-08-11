import { Injectable, CanActivate } from '@nestjs/common';
import { isProd } from '@koh/common';

@Injectable()
export class NonProductionGuard implements CanActivate {
  canActivate(): boolean {
    return !isProd();
  }
}
