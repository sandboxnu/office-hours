import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DefaultTeamMessage1633575884668 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
