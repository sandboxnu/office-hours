import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstLastName1606609022417 implements MigrationInterface {
  name = 'AddFirstLastName1606609022417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_model" ADD "firstName" text`);
    await queryRunner.query(`ALTER TABLE "user_model" ADD "lastName" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "lastName"`);
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "firstName"`);
  }
}
