import { MigrationInterface, QueryRunner } from 'typeorm';

export class purgeOhmodel1644174303826 implements MigrationInterface {
  name = 'purgeOhmodel1644174303826';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "office_hour" DROP CONSTRAINT "FK_d7aaaf3edb274548db29c257452"`,
    );
    await queryRunner.query(
      `ALTER TABLE "office_hour" DROP CONSTRAINT "FK_f52df22dd06ee3187489554ce1c"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "office_hour" ADD CONSTRAINT "FK_f52df22dd06ee3187489554ce1c" FOREIGN KEY ("queueId") REFERENCES "queue_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "office_hour" ADD CONSTRAINT "FK_d7aaaf3edb274548db29c257452" FOREIGN KEY ("courseId") REFERENCES "course_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
