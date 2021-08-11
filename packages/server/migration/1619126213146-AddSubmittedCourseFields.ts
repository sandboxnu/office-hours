import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubmittedCourseFields1619126213146
  implements MigrationInterface
{
  name = 'AddSubmittedCourseFields1619126213146';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "coordinator_email" text`,
    );
    await queryRunner.query(`ALTER TABLE "course_model" ADD "pending" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_model" DROP COLUMN "pending"`);
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "coordinator_email"`,
    );
  }
}
