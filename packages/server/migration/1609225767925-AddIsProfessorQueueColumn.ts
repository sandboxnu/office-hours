import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsProfessorQueueColumn1609225767925
  implements MigrationInterface
{
  name = 'AddIsProfessorQueueColumn1609225767925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model" ADD "isProfessorQueue" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model" DROP COLUMN "isProfessorQueue"`,
    );
  }
}
