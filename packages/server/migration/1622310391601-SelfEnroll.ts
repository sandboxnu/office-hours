import { MigrationInterface, QueryRunner } from 'typeorm';

export class SelfEnroll1622310391601 implements MigrationInterface {
  name = 'SelfEnroll1622310391601';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_course_model" ADD "expires" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "selfEnroll" boolean DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "selfEnroll"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_course_model" DROP COLUMN "expires"`,
    );
  }
}
