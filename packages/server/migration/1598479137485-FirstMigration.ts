import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1598479137485 implements MigrationInterface {
  name = 'FirstMigration1598479137485';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "desktop_notif_model" ("id" SERIAL NOT NULL, "endpoint" text NOT NULL, "expirationTime" TIMESTAMP, "p256dh" text NOT NULL, "auth" text NOT NULL, "userId" integer, CONSTRAINT "PK_d3052edaec243f21b0f2412cf34" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "phone_notif_model" ("id" SERIAL NOT NULL, "phoneNumber" text NOT NULL, "userId" integer, "verified" boolean NOT NULL, CONSTRAINT "REL_19336b4c7b95400d021ba57200" UNIQUE ("userId"), CONSTRAINT "PK_f13c8dd6825f896d403bfa18a59" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user_course_model_role_enum" AS ENUM('student', 'ta', 'professor')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_course_model" ("id" SERIAL NOT NULL, "userId" integer, "courseId" integer, "role" "user_course_model_role_enum" NOT NULL DEFAULT 'student', CONSTRAINT "PK_2cbd278a1b02be0836e035932d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_model" ("id" SERIAL NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "name" text NOT NULL, "photoURL" text NOT NULL, "desktopNotifsEnabled" boolean NOT NULL DEFAULT false, "phoneNotifsEnabled" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7d6bfa71f4d6a1fa0af1f688327" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question_model" ("id" SERIAL NOT NULL, "queueId" integer, "text" text NOT NULL, "creatorId" integer, "taHelpedId" integer, "createdAt" TIMESTAMP NOT NULL, "helpedAt" TIMESTAMP, "closedAt" TIMESTAMP, "questionType" text NOT NULL, "status" text NOT NULL, "location" character varying, "isOnline" boolean, CONSTRAINT "PK_c500e98286cf533b93c8ca91ac9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "queue_model" ("id" SERIAL NOT NULL, "courseId" integer, "room" text NOT NULL, "notes" text, "allowQuestions" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_5b66cb7b2bb41ac4c8657e02849" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "office_hour" ("id" SERIAL NOT NULL, "courseId" integer, "queueId" integer, "title" text NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_94cbf1ca94be554b46134ffebbb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "semester_model" ("id" SERIAL NOT NULL, "season" text NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_1a6198e89d15dc319132ce57b1c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_model" ("id" SERIAL NOT NULL, "name" text NOT NULL, "icalURL" text, "semesterId" integer, "enabled" boolean, CONSTRAINT "PK_78f12196238e8ce83a249b05af2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "admin_user_model" ("id" SERIAL NOT NULL, "username" character varying(128) NOT NULL, "passwordHash" character varying(128) NOT NULL, CONSTRAINT "UQ_3bd93958ed6371e903adcf949ed" UNIQUE ("username"), CONSTRAINT "PK_8a1fc018fffae50239eeb881673" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "queue_model_staff_list_user_model" ("queueModelId" integer NOT NULL, "userModelId" integer NOT NULL, CONSTRAINT "PK_6b3aa53a9f57b461eb8aa68cfd3" PRIMARY KEY ("queueModelId", "userModelId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2fd33d9360492e0ae1cc3332bd" ON "queue_model_staff_list_user_model" ("queueModelId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_afc7595c6141d48fc334da2240" ON "queue_model_staff_list_user_model" ("userModelId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "desktop_notif_model" ADD CONSTRAINT "FK_1e4a83bab6e8e701425f3461b04" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "phone_notif_model" ADD CONSTRAINT "FK_19336b4c7b95400d021ba572001" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_course_model" ADD CONSTRAINT "FK_80faf01af81ddc3f4c17b6b6614" FOREIGN KEY ("userId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_course_model" ADD CONSTRAINT "FK_3f38d8a85115b61789f02fc5c3b" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD CONSTRAINT "FK_d0a57d15e4e5c1ac71886fb4409" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD CONSTRAINT "FK_969263fc8aa84d9aafc44c6b855" FOREIGN KEY ("creatorId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" ADD CONSTRAINT "FK_330cd37cdeeb5f54be558551fc8" FOREIGN KEY ("taHelpedId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model" ADD CONSTRAINT "FK_a35e40a16b61a6e191ad097ccdc" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "office_hour" ADD CONSTRAINT "FK_d7aaaf3edb274548db29c257452" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "office_hour" ADD CONSTRAINT "FK_f52df22dd06ee3187489554ce1c" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD CONSTRAINT "FK_34820ed355fa20cb6037e9cab78" FOREIGN KEY ("semesterId") REFERENCES "semester_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde" FOREIGN KEY ("queueModelId") REFERENCES "queue_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_afc7595c6141d48fc334da22409" FOREIGN KEY ("userModelId") REFERENCES "user_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_afc7595c6141d48fc334da22409"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP CONSTRAINT "FK_34820ed355fa20cb6037e9cab78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "office_hour" DROP CONSTRAINT "FK_f52df22dd06ee3187489554ce1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "office_hour" DROP CONSTRAINT "FK_d7aaaf3edb274548db29c257452"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model" DROP CONSTRAINT "FK_a35e40a16b61a6e191ad097ccdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP CONSTRAINT "FK_330cd37cdeeb5f54be558551fc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP CONSTRAINT "FK_969263fc8aa84d9aafc44c6b855"`,
    );
    await queryRunner.query(
      `ALTER TABLE "question_model" DROP CONSTRAINT "FK_d0a57d15e4e5c1ac71886fb4409"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_course_model" DROP CONSTRAINT "FK_3f38d8a85115b61789f02fc5c3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_course_model" DROP CONSTRAINT "FK_80faf01af81ddc3f4c17b6b6614"`,
    );
    await queryRunner.query(
      `ALTER TABLE "phone_notif_model" DROP CONSTRAINT "FK_19336b4c7b95400d021ba572001"`,
    );
    await queryRunner.query(
      `ALTER TABLE "desktop_notif_model" DROP CONSTRAINT "FK_1e4a83bab6e8e701425f3461b04"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_afc7595c6141d48fc334da2240"`);
    await queryRunner.query(`DROP INDEX "IDX_2fd33d9360492e0ae1cc3332bd"`);
    await queryRunner.query(`DROP TABLE "queue_model_staff_list_user_model"`);
    await queryRunner.query(`DROP TABLE "admin_user_model"`);
    await queryRunner.query(`DROP TABLE "course_model"`);
    await queryRunner.query(`DROP TABLE "semester_model"`);
    await queryRunner.query(`DROP TABLE "office_hour"`);
    await queryRunner.query(`DROP TABLE "queue_model"`);
    await queryRunner.query(`DROP TABLE "question_model"`);
    await queryRunner.query(`DROP TABLE "user_model"`);
    await queryRunner.query(`DROP TABLE "user_course_model"`);
    await queryRunner.query(`DROP TYPE "user_course_model_role_enum"`);
    await queryRunner.query(`DROP TABLE "phone_notif_model"`);
    await queryRunner.query(`DROP TABLE "desktop_notif_model"`);
  }
}
