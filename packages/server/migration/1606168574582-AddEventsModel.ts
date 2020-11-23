import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEventsModel1606168574582 implements MigrationInterface {
  name = 'AddEventsModel1606168574582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "event_model_eventtype_enum" AS ENUM('taCheckedIn', 'taCheckedOut')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event_model" ("id" SERIAL NOT NULL, "time" TIMESTAMP NOT NULL, "eventType" "event_model_eventtype_enum" NOT NULL, "userId" integer, "courseId" integer, CONSTRAINT "PK_d3e2fa2b042c7b712aa4455fefc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" ADD CONSTRAINT "FK_cca54a7dc79d10d04ba12fe7af4" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" ADD CONSTRAINT "FK_4b2c20ac04a24393fff2d974024" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_model" DROP CONSTRAINT "FK_4b2c20ac04a24393fff2d974024"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" DROP CONSTRAINT "FK_cca54a7dc79d10d04ba12fe7af4"`,
    );
    await queryRunner.query(`DROP TABLE "event_model"`);
    await queryRunner.query(`DROP TYPE "event_model_eventtype_enum"`);
  }
}
