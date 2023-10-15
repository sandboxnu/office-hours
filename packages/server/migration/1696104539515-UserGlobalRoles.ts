import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserGlobalRoles1696104539515 implements MigrationInterface {
  name = 'UserGlobalRoles1696104539515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image_model" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "visible" integer, "data" bytea NOT NULL, "AsyncQuestion" integer, CONSTRAINT "PK_05aa8703890985ec0bb38428699" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "async_question_model" ("id" SERIAL NOT NULL, "courseId" integer, "questionAbstract" text NOT NULL, "questionText" text, "answerText" text, "creatorId" integer, "taHelpedId" integer, "createdAt" TIMESTAMP NOT NULL, "closedAt" TIMESTAMP, "questionType" text, "status" text NOT NULL, "visible" boolean, CONSTRAINT "PK_fa05a9dd394b46bde1b0d2c8e73" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_type_model" ("id" SERIAL NOT NULL, "cid" integer, "question" text, CONSTRAINT "PK_87be2766a950ff35d2bb47ab735" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "calendar_model" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "daysOfWeek" text array, "allDay" boolean, "course" integer, CONSTRAINT "PK_169e34dda38ee87191b602f2a76" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user_model" ADD "sid" integer`);
    await queryRunner.query(`ALTER TABLE "user_model" ADD "password" text`);
    await queryRunner.query(
      `CREATE TYPE "public"."user_model_userrole_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "userRole" "public"."user_model_userrole_enum" NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE "course_model" ADD "zoomLink" text`);
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "questionTimer" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "asyncQuestionDisplayTypes" text array DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_model" ADD CONSTRAINT "FK_178424b63186c86633cb57c0bfb" FOREIGN KEY ("AsyncQuestion") REFERENCES "async_question_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" ADD CONSTRAINT "FK_faac87edafc4297437ed4a12d0e" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" ADD CONSTRAINT "FK_00acd7c57b3cdf6fee41e4608d7" FOREIGN KEY ("creatorId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" ADD CONSTRAINT "FK_981a81bb65a54a23886eadd0b40" FOREIGN KEY ("taHelpedId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "calendar_model" ADD CONSTRAINT "FK_b47c12b782d3e463acdf841bbf7" FOREIGN KEY ("course") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "calendar_model" DROP CONSTRAINT "FK_b47c12b782d3e463acdf841bbf7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" DROP CONSTRAINT "FK_981a81bb65a54a23886eadd0b40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" DROP CONSTRAINT "FK_00acd7c57b3cdf6fee41e4608d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "async_question_model" DROP CONSTRAINT "FK_faac87edafc4297437ed4a12d0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_model" DROP CONSTRAINT "FK_178424b63186c86633cb57c0bfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "asyncQuestionDisplayTypes"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "questionTimer"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "zoomLink"`,
    );
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "userRole"`);
    await queryRunner.query(`DROP TYPE "public"."user_model_userrole_enum"`);
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "sid"`);
    await queryRunner.query(`DROP TABLE "calendar_model"`);
    await queryRunner.query(`DROP TABLE "question_type_model"`);
    await queryRunner.query(`DROP TABLE "async_question_model"`);
    await queryRunner.query(`DROP TABLE "image_model"`);
  }
}
