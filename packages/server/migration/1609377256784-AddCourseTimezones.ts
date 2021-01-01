import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCourseTimezones1609377256784 implements MigrationInterface {
  name = 'AddCourseTimezones1609377256784';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_model" ADD "timezone" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "timezone"`,
    );
  }
}
