import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedInviteCode1697324563903 implements MigrationInterface {
  name = 'addedInviteCode1697324563903';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" ADD "courseInviteCode" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_model" DROP COLUMN "courseInviteCode"`,
    );
  }
}
