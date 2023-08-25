import type { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserSettingsRegions1613955393450
  implements MigrationInterface
{
  name = 'UpdateUserSettingsRegions1613955393450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "region" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "originalLanguage" varchar`
    );

    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME CONSTRAINT "REL_986a2b6d3c05eb4091bb8066f7" TO "UQ_986a2b6d3c05eb4091bb8066f78"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" RENAME TO "temporary_user_settings"`
    );
    await queryRunner.query(
      `CREATE TABLE "user_settings" ("id" SERIAL PRIMARY KEY, "enableNotifications" boolean NOT NULL DEFAULT (1), "discordId" varchar, "userId" integer, CONSTRAINT "UQ_986a2b6d3c05eb4091bb8066f78" UNIQUE ("userId"), CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "user_settings"("id", "enableNotifications", "discordId", "userId") SELECT "id", "enableNotifications", "discordId", "userId" FROM "temporary_user_settings"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user_settings"`);
  }
}
