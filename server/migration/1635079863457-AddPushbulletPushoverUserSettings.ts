import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPushbulletPushoverUserSettings1635079863457
  implements MigrationInterface
{
  name = 'AddPushbulletPushoverUserSettings1635079863457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "pushbulletAccessToken" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "pushoverApplicationToken" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "pushoverUserKey" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "pushbulletAccessToken"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "pushoverApplicationToken"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "pushoverUserKey"`
    );
  }
}
