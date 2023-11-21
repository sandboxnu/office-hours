import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationCourseModel1696214852082
  implements MigrationInterface
{
  name = 'OrganizationCourseModel1696214852082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization_course_model" ("id" SERIAL NOT NULL, "organizationId" integer, "courseId" integer, CONSTRAINT "PK_0c104671bce991fdbf1c3d317e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "organizationCourseId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_course_model" ADD CONSTRAINT "FK_a66ca3a1a5f8947ffeff3ff7f54" FOREIGN KEY ("organizationId") REFERENCES "organization_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD CONSTRAINT "FK_e04e8cfa5bc6ca85981181a9119" FOREIGN KEY ("organizationCourseId") REFERENCES "organization_course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP CONSTRAINT "FK_e04e8cfa5bc6ca85981181a9119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_course_model" DROP CONSTRAINT "FK_a66ca3a1a5f8947ffeff3ff7f54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "organizationCourseId"`,
    );
    await queryRunner.query(`DROP TABLE "organization_course_model"`);
  }
}
