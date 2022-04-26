import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseSectionMappingModelCRNAddition1638656284038
  implements MigrationInterface
{
  name = 'CourseSectionMappingModelCRNAddition1638656284038';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_afc7595c6141d48fc334da22409"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" DROP COLUMN "genericCourseName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" DROP COLUMN "section"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" ADD "crn" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde" FOREIGN KEY ("queueModelId") REFERENCES "queue_model"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_afc7595c6141d48fc334da22409" FOREIGN KEY ("userModelId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_afc7595c6141d48fc334da22409"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" DROP COLUMN "crn"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" ADD "section" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_section_mapping_model" ADD "genericCourseName" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_afc7595c6141d48fc334da22409" FOREIGN KEY ("userModelId") REFERENCES "user_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde" FOREIGN KEY ("queueModelId") REFERENCES "queue_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
