import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddFirstLastName1606609022417 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
