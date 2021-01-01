import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddCourseTimezones1609377256784 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
