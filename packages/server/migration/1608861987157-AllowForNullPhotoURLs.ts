import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowForNullPhotoURLs1608861987157 implements MigrationInterface {
  name = 'AllowForNullPhotoURLs1608861987157';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ALTER COLUMN "photoURL" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ALTER COLUMN "photoURL" SET NOT NULL`,
    );
  }
}
