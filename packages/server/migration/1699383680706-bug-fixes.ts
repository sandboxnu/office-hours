import { MigrationInterface, QueryRunner } from 'typeorm';

export class bugFixes1699383680706 implements MigrationInterface {
  name = 'bugFixes1699383680706';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP CONSTRAINT "FK_e04e8cfa5bc6ca85981181a9119"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "organizationCourseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_course_model" ADD CONSTRAINT "UQ_4fef22be04e7b58e8728a24b207" UNIQUE ("courseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "courseInviteCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "courseInviteCode" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_course_model" ADD CONSTRAINT "FK_4fef22be04e7b58e8728a24b207" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_course_model" DROP CONSTRAINT "FK_4fef22be04e7b58e8728a24b207"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "courseInviteCode"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "courseInviteCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_course_model" DROP CONSTRAINT "UQ_4fef22be04e7b58e8728a24b207"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "organizationCourseId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD CONSTRAINT "FK_e04e8cfa5bc6ca85981181a9119" FOREIGN KEY ("organizationCourseId") REFERENCES "organization_course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
