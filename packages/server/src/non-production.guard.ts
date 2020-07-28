
import { Injectable, CanActivate } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PROD_URL } from '@template/common';

@Injectable()
export class NonProductionGuard implements CanActivate {
  constructor(private configService: ConfigService){}
  canActivate(
  ): boolean {
    return this.configService.get('DOMAIN') !== PROD_URL;
  }
}