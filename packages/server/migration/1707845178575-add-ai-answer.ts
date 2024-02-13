import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAiAnswer1707845178575 implements MigrationInterface {
  name = 'addAiAnswer1707845178575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "async_question_model" ADD "aiAnswerText" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "async_question_model" DROP COLUMN "aiAnswerText"`,
    );
  }
}
