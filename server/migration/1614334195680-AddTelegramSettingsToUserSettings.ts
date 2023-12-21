import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTelegramSettingsToUserSettings1614334195680
  implements MigrationInterface
{
  name = 'AddTelegramSettingsToUserSettings1614334195680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "telegramChatId" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "telegramSendSilently" boolean`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "telegramChatId"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "telegramSendSilently"`
    );
  }
}
