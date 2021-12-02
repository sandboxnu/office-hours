import { MigrationInterface, QueryRunner } from 'typeorm';

/*
This got created after I updated the next10 -> next11, not sure why typeorm would be affected
*/
export class DepUpdates1636213217648 implements MigrationInterface {
  name = 'DepUpdates1636213217648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" DROP CONSTRAINT "FK_afc7595c6141d48fc334da22409"`,
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
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_afc7595c6141d48fc334da22409" FOREIGN KEY ("userModelId") REFERENCES "user_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queue_model_staff_list_user_model" ADD CONSTRAINT "FK_2fd33d9360492e0ae1cc3332bde" FOREIGN KEY ("queueModelId") REFERENCES "queue_model"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
