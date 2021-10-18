import { MigrationInterface, QueryRunner } from 'typeorm';

export class queueIdSetnull1634564017257 implements MigrationInterface {
  name = 'queueIdSetnull1634564017257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_model" DROP CONSTRAINT "FK_bfbc6e5ef5e94a2545ef2d625ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" ADD CONSTRAINT "FK_bfbc6e5ef5e94a2545ef2d625ac" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_model" DROP CONSTRAINT "FK_bfbc6e5ef5e94a2545ef2d625ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" ADD CONSTRAINT "FK_bfbc6e5ef5e94a2545ef2d625ac" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
