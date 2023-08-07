import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class SiteAdminService {
  constructor(private connection: Connection) {}
}
