import { MigrationInterface, QueryRunner } from 'typeorm';

export class HideInsightsAndAddDefault1616979799180
  implements MigrationInterface {
  name = 'HideInsightsAndAddDefault1616979799180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" RENAME COLUMN "insights" TO "hideInsights"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ALTER COLUMN "hideInsights" SET DEFAULT '[]'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ALTER COLUMN "hideInsights" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" RENAME COLUMN "hideInsights" TO "insights"`,
    );
  }
}
