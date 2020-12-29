import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInsightsToUser1609047234833 implements MigrationInterface {
  name = 'AddInsightsToUser1609047234833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_model" ADD "insights" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "insights"`);
  }
}
