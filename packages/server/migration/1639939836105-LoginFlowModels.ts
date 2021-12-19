import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoginFlowModels1639939836105 implements MigrationInterface {
  name = 'LoginFlowModels1639939836105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "last_registration_model" ("id" SERIAL NOT NULL, "profId" integer NOT NULL, "lastRegisteredSemester" text NOT NULL, CONSTRAINT "REL_765fe567b826dd6ba406d802df" UNIQUE ("profId"), CONSTRAINT "PK_6d0443f00d236b837aaf4a49726" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "prof_section_groups_model" ("id" SERIAL NOT NULL, "profId" integer NOT NULL, "sectionGroups" jsonb, CONSTRAINT "REL_f4883601530ed63d8dcafea57d" UNIQUE ("profId"), CONSTRAINT "PK_48eff12d6af8235a16acd3d578f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "sectionGroupName" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_registration_model" ADD CONSTRAINT "FK_765fe567b826dd6ba406d802df6" FOREIGN KEY ("profId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "prof_section_groups_model" ADD CONSTRAINT "FK_f4883601530ed63d8dcafea57d2" FOREIGN KEY ("profId") REFERENCES "user_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prof_section_groups_model" DROP CONSTRAINT "FK_f4883601530ed63d8dcafea57d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "last_registration_model" DROP CONSTRAINT "FK_765fe567b826dd6ba406d802df6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "sectionGroupName"`,
    );
    await queryRunner.query(`DROP TABLE "prof_section_groups_model"`);
    await queryRunner.query(`DROP TABLE "last_registration_model"`);
  }
}
