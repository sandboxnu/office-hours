import { MigrationInterface, QueryRunner } from 'typeorm';

export class renameQuestionTypeCol1702234882706 implements MigrationInterface {
  name = 'renameQuestionTypeCol1702234882706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_type_model" RENAME COLUMN "question" TO "name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_type_model" RENAME COLUMN "name" TO "question"`,
    );
  }
}
