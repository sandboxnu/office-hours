import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInsightsToUser1617556892248 implements MigrationInterface {
  name = 'AddInsightsToUser1617556892248';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_model" ADD "hideInsights" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" DROP COLUMN "hideInsights"`,
    );
  }
}
