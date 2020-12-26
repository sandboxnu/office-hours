import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AllowForNullPhotoURLs1608861987157 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
