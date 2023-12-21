import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserSettings1613615266968 implements MigrationInterface {
  name = 'CreateUserSettings1613615266968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_settings" ("id" SERIAL PRIMARY KEY, "enableNotifications" boolean NOT NULL DEFAULT (true), "discordId" varchar, "userId" integer, CONSTRAINT "REL_986a2b6d3c05eb4091bb8066f7" UNIQUE ("userId"), CONSTRAINT "FK_986a2b6d3c05eb4091bb8066f78" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_settings"`);
  }
}
