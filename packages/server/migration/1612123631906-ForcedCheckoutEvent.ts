import { MigrationInterface, QueryRunner } from 'typeorm';

export class ForcedCheckoutEvent1612123631906 implements MigrationInterface {
  name = 'ForcedCheckoutEvent1612123631906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."event_model_eventtype_enum" RENAME TO "event_model_eventtype_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "event_model_eventtype_enum" AS ENUM('taCheckedIn', 'taCheckedOut', 'taCheckedOutForced')`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" ALTER COLUMN "eventType" TYPE "event_model_eventtype_enum" USING "eventType"::"text"::"event_model_eventtype_enum"`,
    );
    await queryRunner.query(`DROP TYPE "event_model_eventtype_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "event_model_eventtype_enum_old" AS ENUM('taCheckedIn', 'taCheckedOut')`,
    );
    await queryRunner.query(
      `ALTER TABLE "event_model" ALTER COLUMN "eventType" TYPE "event_model_eventtype_enum_old" USING "eventType"::"text"::"event_model_eventtype_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "event_model_eventtype_enum"`);
    await queryRunner.query(
      `ALTER TYPE "event_model_eventtype_enum_old" RENAME TO  "event_model_eventtype_enum"`,
    );
  }
}
