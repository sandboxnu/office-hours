import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCourseOverride1611958171853 implements MigrationInterface {
  name = 'UserCourseOverride1611958171853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_course_model" ADD "override" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_course_model" DROP COLUMN "override"`,
    );
  }
}
