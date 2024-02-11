import { MigrationInterface, QueryRunner } from 'typeorm';

export class setDefaultQuestionTypeColor1706472881989
  implements MigrationInterface
{
  name = 'setDefaultQuestionTypeColor1706472881989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_type_model" ALTER COLUMN "color" SET DEFAULT '#000000'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_type_model" ALTER COLUMN "color" DROP DEFAULT`,
    );
  }
}
