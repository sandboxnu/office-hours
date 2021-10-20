import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIsOnlineFromQuestionModel1634769804861
  implements MigrationInterface {
  name = 'RemoveIsOnlineFromQuestionModel1634769804861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP COLUMN "isOnline"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD "isOnline" boolean`,
    );
  }
}
