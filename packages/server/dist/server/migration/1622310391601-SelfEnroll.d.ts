import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class SelfEnroll1622310391601 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
