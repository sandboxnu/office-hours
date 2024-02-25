import { MigrationInterface, QueryRunner } from 'typeorm';

export class createChatbot1706472690008 implements MigrationInterface {
  name = 'createChatbot1706472690008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question_document_model" ("id" SERIAL NOT NULL, "questionId" integer NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "parts" text array NOT NULL, "question" integer, CONSTRAINT "PK_c8480de4d48b8bd2f557a533346" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chatbot_questions_model" ("id" SERIAL NOT NULL, "vectorStoreId" character varying, "interactionId" integer, "questionText" character varying NOT NULL, "responseText" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userScore" integer NOT NULL DEFAULT '0', "suggested" boolean NOT NULL DEFAULT false, "interaction" integer, CONSTRAINT "PK_2c16440cca88ebd9a6211cab9b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "chatbot_interactions_model" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL, "course" integer, "user" integer, CONSTRAINT "PK_dfa22bd83de6c88afe6caa5ae37" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_document_model" ADD CONSTRAINT "FK_a175cc149f7941bf1663ce6c627" FOREIGN KEY ("question") REFERENCES "chatbot_questions_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatbot_questions_model" ADD CONSTRAINT "FK_cbae79b5aab51ebd086473b1aa7" FOREIGN KEY ("interaction") REFERENCES "chatbot_interactions_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatbot_interactions_model" ADD CONSTRAINT "FK_7df3546203b677c555f27974c25" FOREIGN KEY ("course") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatbot_interactions_model" ADD CONSTRAINT "FK_8db2901f8e702975574c1579bad" FOREIGN KEY ("user") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chatbot_interactions_model" DROP CONSTRAINT "FK_8db2901f8e702975574c1579bad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatbot_interactions_model" DROP CONSTRAINT "FK_7df3546203b677c555f27974c25"`,
    );
    await queryRunner.query(
      `ALTER TABLE "chatbot_questions_model" DROP CONSTRAINT "FK_cbae79b5aab51ebd086473b1aa7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_document_model" DROP CONSTRAINT "FK_a175cc149f7941bf1663ce6c627"`,
    );
    await queryRunner.query(`DROP TABLE "chatbot_interactions_model"`);
    await queryRunner.query(`DROP TABLE "chatbot_questions_model"`);
    await queryRunner.query(`DROP TABLE "question_document_model"`);
  }
}
