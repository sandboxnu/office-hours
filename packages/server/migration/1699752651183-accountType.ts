import { MigrationInterface, QueryRunner } from 'typeorm';

export class accountType1699752651183 implements MigrationInterface {
  name = 'accountType1699752651183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "accountType" text NOT NULL DEFAULT 'legacy'`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "accountType"`,
    );
  }
}
