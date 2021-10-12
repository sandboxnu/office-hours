import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuestionGrouping1618258889513 implements MigrationInterface {
  name = 'AddQuestionGrouping1618258889513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "question_group_model" ("id" SERIAL NOT NULL, "creatorId" integer NOT NULL, "queueId" integer, CONSTRAINT "PK_8fd732a9db416edb70c7fdc8a3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD "groupable" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD "groupId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD CONSTRAINT "FK_72fbff278f28a4f6aeaa31d8fb8" FOREIGN KEY ("groupId") REFERENCES "question_group_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_group_model" ADD CONSTRAINT "FK_8c4bacefb7d000a0981dde66ed9" FOREIGN KEY ("creatorId") REFERENCES "user_course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_group_model" ADD CONSTRAINT "FK_a004c9c659f860bc2f64d107ab6" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question_group_model" DROP CONSTRAINT "FK_a004c9c659f860bc2f64d107ab6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_group_model" DROP CONSTRAINT "FK_8c4bacefb7d000a0981dde66ed9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP CONSTRAINT "FK_72fbff278f28a4f6aeaa31d8fb8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP COLUMN "groupId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP COLUMN "groupable"`,
    );
    await queryRunner.query(`DROP TABLE "question_group_model"`);
  }
}
