import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveGroupableNullable1634951986080
  implements MigrationInterface
{
  name = 'RemoveGroupableNullable1634951986080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_model" ALTER COLUMN "groupable" SET NOT NULL`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "question_model"."groupable" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "question_model"."groupable" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ALTER COLUMN "groupable" DROP NOT NULL`,
    );
  }
}
