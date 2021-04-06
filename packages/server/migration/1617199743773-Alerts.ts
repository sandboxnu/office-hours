import { MigrationInterface, QueryRunner } from 'typeorm';

export class Alerts1617199743773 implements MigrationInterface {
  name = 'Alerts1617199743773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "alert_model_alerttype_enum" AS ENUM('rephraseQuestion')`,
    );
    await queryRunner.query(
      `CREATE TABLE "alert_model" ("id" SERIAL NOT NULL, "alertType" "alert_model_alerttype_enum" NOT NULL, "sent" TIMESTAMP NOT NULL, "resolved" TIMESTAMP, "userId" integer, "courseId" integer, "payload" json NOT NULL, CONSTRAINT "PK_5dc11158250a348d41af881f2cf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_model" ADD CONSTRAINT "FK_b8c814dda28118c8a141863afff" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_model" ADD CONSTRAINT "FK_71566c4e2836bea0d62bb7b4db2" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alert_model" DROP CONSTRAINT "FK_71566c4e2836bea0d62bb7b4db2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "alert_model" DROP CONSTRAINT "FK_b8c814dda28118c8a141863afff"`,
    );
    await queryRunner.query(`DROP TABLE "alert_model"`);
    await queryRunner.query(`DROP TYPE "alert_model_alerttype_enum"`);
  }
}
