import type { MigrationInterface, QueryRunner } from 'typeorm';

export class LocalUsers1610070934506 implements MigrationInterface {
  name = 'LocalUsers1610070934506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS"UQ_e12875dfb3b1d92d7d7c5377e22"`
    ); // new

    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" SERIAL PRIMARY KEY, "email" varchar NOT NULL, "username" varchar NOT NULL, "plexId" integer NOT NULL, "plexToken" varchar, "permissions" integer NOT NULL DEFAULT (0), "avatar" varchar NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "password" varchar, "userType" integer NOT NULL DEFAULT (1), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );

    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt") SELECT "id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt" FROM "user"`
    );

    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT IF EXISTS "FK_6997bee94720f1ecb7f31137095"`
    ); // new
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT IF EXISTS "FK_f4fc4efa14c3ba2b29c4525fa15"`
    ); // new

    await queryRunner.query(`DROP TABLE "user"`);

    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);

    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_6997bee94720f1ecb7f31137095" FOREIGN KEY ("requestedById") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    ); // new
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_f4fc4efa14c3ba2b29c4525fa15" FOREIGN KEY ("modifiedById") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    ); // new

    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT IF EXISTS "UQ_e12875dfb3b1d92d7d7c5377e22"`
    ); // new

    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" SERIAL PRIMARY KEY, "email" varchar NOT NULL, "username" varchar NOT NULL, "plexId" integer, "plexToken" varchar, "permissions" integer NOT NULL DEFAULT (0), "avatar" varchar NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "password" varchar, "userType" integer NOT NULL DEFAULT (1), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );

    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt", "password", "userType") SELECT "id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt", "password", "userType" FROM "user"`
    );

    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT IF EXISTS "FK_6997bee94720f1ecb7f31137095"`
    ); // new
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT IF EXISTS "FK_f4fc4efa14c3ba2b29c4525fa15"`
    ); // new

    await queryRunner.query(`DROP TABLE "user"`);

    await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);

    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_6997bee94720f1ecb7f31137095" FOREIGN KEY ("requestedById") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    ); // new
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_f4fc4efa14c3ba2b29c4525fa15" FOREIGN KEY ("modifiedById") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION`
    ); // new
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL PRIMARY KEY, "email" varchar NOT NULL, "username" varchar NOT NULL, "plexId" integer NOT NULL, "plexToken" varchar, "permissions" integer NOT NULL DEFAULT (0), "avatar" varchar NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "password" varchar, "userType" integer NOT NULL DEFAULT (1), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt", "password", "userType") SELECT "id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt", "password", "userType" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
    await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL PRIMARY KEY, "email" varchar NOT NULL, "username" varchar NOT NULL, "plexId" integer NOT NULL, "plexToken" varchar, "permissions" integer NOT NULL DEFAULT (0), "avatar" varchar NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt") SELECT "id", "email", "username", "plexId", "plexToken", "permissions", "avatar", "createdAt", "updatedAt" FROM "temporary_user"`
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`);
  }
}
