import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionTypeNullable1602086155261 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE question_model ALTER COLUMN "questionType" DROP NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE question_model ALTER COLUMN "questionType" SET NOT NULL;`,
    );
  }
}
