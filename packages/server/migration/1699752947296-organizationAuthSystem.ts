import { MigrationInterface, QueryRunner } from 'typeorm';

export class organizationAuthSystem1699752947296 implements MigrationInterface {
  name = 'organizationAuthSystem1699752947296';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_model" ADD "legacyAuthEnabled" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_model" ADD "googleAuthEnabled" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_model" DROP COLUMN "googleAuthEnabled"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_model" DROP COLUMN "legacyAuthEnabled"`,
    );
  }
}
