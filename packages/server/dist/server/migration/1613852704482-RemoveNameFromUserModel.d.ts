import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RemoveNameFromUserModel1613852704482 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
