import { MigrationInterface, QueryRunner } from 'typeorm';

export class queueIdUpdate1634498029687 implements MigrationInterface {
  name = 'queueIdUpdate1634498029687';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event_model" ADD "queueId" integer`);
    await queryRunner.query(
      `ALTER TABLE "event_model" ADD CONSTRAINT "FK_bfbc6e5ef5e94a2545ef2d625ac" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event_model" DROP CONSTRAINT "FK_bfbc6e5ef5e94a2545ef2d625ac"`,
    );
    await queryRunner.query(`ALTER TABLE "event_model" DROP COLUMN "queueId"`);
  }
}
