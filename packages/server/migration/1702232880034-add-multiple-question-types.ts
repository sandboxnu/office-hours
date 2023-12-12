import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMultipleQuestionTypes1702232880034
  implements MigrationInterface
{
  name = 'addMultipleQuestionTypes1702232880034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question_question_type_model" ("questionId" integer NOT NULL, "questionTypeId" integer NOT NULL, CONSTRAINT "PK_d095cf5e00b81b0ba01613c4cc1" PRIMARY KEY ("questionId", "questionTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bc6bfc7f61c7bc23e010017959" ON "question_question_type_model" ("questionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3c8ba3b5a5d91391e20045e72a" ON "question_question_type_model" ("questionTypeId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP COLUMN "questionType"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_question_type_model" ADD CONSTRAINT "FK_bc6bfc7f61c7bc23e0100179597" FOREIGN KEY ("questionId") REFERENCES "question_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_question_type_model" ADD CONSTRAINT "FK_3c8ba3b5a5d91391e20045e72ab" FOREIGN KEY ("questionTypeId") REFERENCES "question_type_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_question_type_model" DROP CONSTRAINT "FK_3c8ba3b5a5d91391e20045e72ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_question_type_model" DROP CONSTRAINT "FK_bc6bfc7f61c7bc23e0100179597"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD "questionType" text`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3c8ba3b5a5d91391e20045e72a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bc6bfc7f61c7bc23e010017959"`,
    );
    await queryRunner.query(`DROP TABLE "question_question_type_model"`);
  }
}
