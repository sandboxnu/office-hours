import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class SeedService {
    async deleteAll(model: any): Promise<void> {
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(model)
            .execute();
    }
}
