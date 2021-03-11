import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class SeedService {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async deleteAll(model: any): Promise<void> {
    await getConnection().createQueryBuilder().delete().from(model).execute();
  }
}
