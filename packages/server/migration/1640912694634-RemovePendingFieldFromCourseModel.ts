import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovePendingFieldFromCourseModel1640912694634
  implements MigrationInterface
{
  name = 'RemovePendingFieldFromCourseModel1640912694634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_model" DROP COLUMN "pending"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "course_model" ADD "pending" boolean`);
  }
}
