import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsProfessorQueueColumn1609225767925 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
