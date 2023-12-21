import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSettingsNotificationTypes1619339817343
  implements MigrationInterface
{
  name = 'AddUserSettingsNotificationTypes1619339817343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME COLUMN "notificationAgents" TO "notificationTypes"`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" ALTER COLUMN "notificationTypes" TYPE text`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" ALTER COLUMN "notificationTypes" DROP DEFAULT`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" ALTER COLUMN "notificationTypes" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME COLUMN "notificationTypes" TO "notificationAgents"`
    );

    // FIXME: i guarantee you this WILL explode upon encountering actual data
    await queryRunner.query(
      `ALTER TABLE "user_settings" ALTER COLUMN "notificationAgents" TYPE integer USING "notificationAgents"::integer`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" ALTER COLUMN "notificationAgents" SET DEFAULT (2)`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" ALTER COLUMN "notificationAgents" SET NOT NULL`
    );
  }
}
