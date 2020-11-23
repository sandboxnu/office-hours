import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddEventsModel1606168574582 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
