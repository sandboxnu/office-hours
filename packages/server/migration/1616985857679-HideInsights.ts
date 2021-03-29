import { MigrationInterface, QueryRunner } from 'typeorm';

export class HideInsights1616985857679 implements MigrationInterface {
  name = 'HideInsights1616985857679';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" RENAME COLUMN "insights" TO "hideInsights"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" RENAME COLUMN "hideInsights" TO "insights"`,
    );
  }
}
