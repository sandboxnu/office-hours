import { MigrationInterface, QueryRunner } from 'typeorm';

export class addVotes1709411044760 implements MigrationInterface {
  name = 'addVotes1709411044760';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "async_question_model" ADD "votes" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "async_question_model" DROP COLUMN "votes"`,
    );
  }
}
