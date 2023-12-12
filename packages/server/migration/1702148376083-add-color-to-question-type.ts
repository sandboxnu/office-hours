import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColorToQuestionType1702148376083 implements MigrationInterface {
  name = 'addColorToQuestionType1702148376083';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chatbot_document_model" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "subDocumentIds" text array NOT NULL, "course" integer, CONSTRAINT "PK_8760e7cb13a6789363f75e04c0d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_type_model" ADD "color" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatbot_document_model" ADD CONSTRAINT "FK_5182655e96768e508eb83cec6a8" FOREIGN KEY ("course") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chatbot_document_model" DROP CONSTRAINT "FK_5182655e96768e508eb83cec6a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_type_model" DROP COLUMN "color"`,
    );
    await queryRunner.query(`DROP TABLE "chatbot_document_model"`);
  }
}
