import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionFirstHelpedAt1606074022190 implements MigrationInterface {
  name = 'QuestionFirstHelpedAt1606074022190';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD "firstHelpedAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP COLUMN "firstHelpedAt"`,
    );
  }
}
