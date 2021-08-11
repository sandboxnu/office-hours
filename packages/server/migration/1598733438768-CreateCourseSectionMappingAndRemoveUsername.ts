import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseSectionMappingAndRemoveUsername1598733438768
  implements MigrationInterface
{
  name = 'CreateCourseSectionMappingAndRemoveUsername1598733438768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "course_section_mapping_model" ("id" SERIAL NOT NULL, "genericCourseName" character varying NOT NULL, "section" integer NOT NULL, "courseId" integer, CONSTRAINT "PK_ed5d8e4898d48074841377d38d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" ADD CONSTRAINT "FK_e0c220bbfe1eaf2f8488624853d" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" DROP CONSTRAINT "FK_e0c220bbfe1eaf2f8488624853d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "username" text NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "course_section_mapping_model"`);
  }
}
