import { MigrationInterface, QueryRunner } from 'typeorm';

export class accountDeactivation1698525398806 implements MigrationInterface {
  name = 'accountDeactivation1698525398806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "accountDeactivated" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user_model" ADD CONSTRAINT "UQ_d76bf27825067e1e6f83d7913fc" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user_model" ADD CONSTRAINT "FK_d76bf27825067e1e6f83d7913fc" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_user_model" DROP CONSTRAINT "FK_d76bf27825067e1e6f83d7913fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user_model" DROP CONSTRAINT "UQ_d76bf27825067e1e6f83d7913fc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "accountDeactivated"`,
    );
  }
}
