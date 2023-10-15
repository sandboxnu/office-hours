import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrganizationModel1696128511902 implements MigrationInterface {
  name = 'OrganizationModel1696128511902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "organization_model" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "logoUrl" text, "bannerUrl" text, "websiteUrl" text, "ssoEnabled" boolean NOT NULL DEFAULT false, "ssoUrl" text, CONSTRAINT "PK_58d7955a28fb825ca3ad5b18862" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."organization_user_model_role_enum" AS ENUM('member', 'admin', 'professor')`,
    );
    await queryRunner.query(
      `CREATE TABLE "organization_user_model" ("id" SERIAL NOT NULL, "userId" integer, "organizationId" integer, "role" "public"."organization_user_model_role_enum" NOT NULL DEFAULT 'member', CONSTRAINT "PK_5611727c18cc918add73c20efc6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization_user_model" ADD CONSTRAINT "FK_5d6af5a8f147be0ffb523ae9f58" FOREIGN KEY ("organizationId") REFERENCES "organization_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "organization_user_model" DROP CONSTRAINT "FK_5d6af5a8f147be0ffb523ae9f58"`,
    );
    await queryRunner.query(`DROP TABLE "organization_user_model"`);
    await queryRunner.query(
      `DROP TYPE "public"."organization_user_model_role_enum"`,
    );
    await queryRunner.query(`DROP TABLE "organization_model"`);
  }
}
