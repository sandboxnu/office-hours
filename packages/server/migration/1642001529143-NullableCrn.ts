import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableCrn1642001529143 implements MigrationInterface {
  name = 'NullableCrn1642001529143';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" ALTER COLUMN "crn" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" ALTER COLUMN "crn" SET NOT NULL`,
    );
  }
}
