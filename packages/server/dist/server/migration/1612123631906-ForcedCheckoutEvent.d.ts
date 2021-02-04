import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ForcedCheckoutEvent1612123631906 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
