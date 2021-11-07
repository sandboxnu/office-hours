import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultTeamMessage1633575884668 implements MigrationInterface {
  name = 'DefaultTeamMessage1633575884668';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "defaultMessage" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "includeDefaultMessage" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "includeDefaultMessage"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "defaultMessage"`,
    );
  }
}
