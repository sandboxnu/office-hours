import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class QuestionFirstHelpedAt1606074022190 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
