import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddResetPasswordGuidAndExpiryDate1612482778137
  implements MigrationInterface
{
  name = 'AddResetPasswordGuidAndExpiryDate1612482778137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "resetPasswordGuid" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "recoveryLinkExpirationDate" date`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL PRIMARY KEY, "email" varchar NOT NULL, "username" varchar, "plexId" integer, "plexToken" varchar, "permissions" integer NOT NULL DEFAULT (0), "avatar" varchar NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "password" varchar, "userType" integer NOT NULL DEFAULT (1), "plexUsername" varchar, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt", "password", "userType", "plexUsername") SELECT "id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt", "password", "userType", "plexUsername" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
