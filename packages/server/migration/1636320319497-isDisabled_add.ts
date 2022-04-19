import { MigrationInterface, QueryRunner } from 'typeorm';

export class isDisabledAdd1636320319497 implements MigrationInterface {
  name = 'isDisabledAdd1636320319497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model" ADD "isDisabled" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model" DROP COLUMN "isDisabled"`,
    );
  }
}
