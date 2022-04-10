import { MigrationInterface, QueryRunner } from 'typeorm';

export class sectionGroupNameNull1645995817187 implements MigrationInterface {
  name = 'sectionGroupNameNull1645995817187';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" ALTER COLUMN "sectionGroupName" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" ALTER COLUMN "sectionGroupName" DROP NOT NULL`,
    );
  }
}
