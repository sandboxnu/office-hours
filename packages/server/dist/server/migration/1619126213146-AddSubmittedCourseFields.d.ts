import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddSubmittedCourseFields1619126213146 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
