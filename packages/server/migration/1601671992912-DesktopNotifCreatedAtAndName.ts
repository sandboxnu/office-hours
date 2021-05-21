import { MigrationInterface, QueryRunner } from 'typeorm';

export class DesktopNotifCreatedAtAndName1601671992912
  implements MigrationInterface
{
  name = 'DesktopNotifCreatedAtAndName1601671992912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "desktop_notif_model" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "desktop_notif_model" ADD "name" text`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "desktop_notif_model" DROP COLUMN "name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "desktop_notif_model" DROP COLUMN "createdAt"`,
    );
  }
}
