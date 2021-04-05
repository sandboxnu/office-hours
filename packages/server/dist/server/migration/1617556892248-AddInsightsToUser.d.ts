import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddInsightsToUser1617556892248 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
