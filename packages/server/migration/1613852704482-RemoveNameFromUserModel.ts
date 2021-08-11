import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNameFromUserModel1613852704482
  implements MigrationInterface
{
  name = 'RemoveNameFromUserModel1613852704482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_model" DROP COLUMN "name"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_model" ADD "name" text NOT NULL`,
    );
  }
}
