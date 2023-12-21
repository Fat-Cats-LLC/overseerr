import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSettingsNotificationAgentsField1617730837489
  implements MigrationInterface
{
  name = 'AddUserSettingsNotificationAgentsField1617730837489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "enableNotifications"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "notificationAgents" integer NOT NULL DEFAULT (2)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "enableNotifications" boolean NOT NULL DEFAULT (true)`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "notificationAgents"`
    );
  }
}
