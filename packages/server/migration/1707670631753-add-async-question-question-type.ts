import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAsyncQuestionQuestionType1707670631753
  implements MigrationInterface
{
  name = 'addAsyncQuestionQuestionType1707670631753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "async_question_question_type_model" ("questionId" integer NOT NULL, "questionTypeId" integer NOT NULL, CONSTRAINT "PK_ed41fa9ef3d56ac433219096cf3" PRIMARY KEY ("questionId", "questionTypeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2bd3a8b19d3f7d47f11c74644" ON "async_question_question_type_model" ("questionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_50664d2df3841be1660871f04d" ON "async_question_question_type_model" ("questionTypeId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" DROP COLUMN "questionType"`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_question_type_model" ADD CONSTRAINT "FK_f2bd3a8b19d3f7d47f11c746448" FOREIGN KEY ("questionId") REFERENCES "async_question_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_question_type_model" ADD CONSTRAINT "FK_50664d2df3841be1660871f04d8" FOREIGN KEY ("questionTypeId") REFERENCES "question_type_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "async_question_question_type_model" DROP CONSTRAINT "FK_50664d2df3841be1660871f04d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_question_type_model" DROP CONSTRAINT "FK_f2bd3a8b19d3f7d47f11c746448"`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" ADD "questionType" text`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_50664d2df3841be1660871f04d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2bd3a8b19d3f7d47f11c74644"`,
    );
    await queryRunner.query(`DROP TABLE "async_question_question_type_model"`);
  }
}
