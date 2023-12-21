import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPushoverSound1697393491630 implements MigrationInterface {
  name = 'AddUserPushoverSound1697393491630';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "pushoverSound" varchar`
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "pushoverSound"`
    );
  }
}
