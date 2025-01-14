import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1603944374840 implements MigrationInterface {
  name = 'InitialMigration1603944374840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL PRIMARY KEY, "email" varchar NOT NULL, "username" varchar NOT NULL, "plexId" integer NOT NULL, "plexToken" varchar, "permissions" integer NOT NULL DEFAULT (0), "avatar" varchar NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`
    );

    await queryRunner.query(
      `CREATE TABLE "season_request" ("id" SERIAL PRIMARY KEY, "seasonNumber" integer NOT NULL, "status" integer NOT NULL DEFAULT (1), "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "requestId" integer)`
    );

    await queryRunner.query(
      `CREATE TABLE "media_request" ("id" SERIAL PRIMARY KEY, "status" integer NOT NULL, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "type" varchar NOT NULL, "mediaId" integer, "requestedById" integer, "modifiedById" integer)`
    );

    await queryRunner.query(
      `CREATE TABLE "media" ("id" SERIAL PRIMARY KEY, "mediaType" varchar NOT NULL, "tmdbId" integer NOT NULL, "tvdbId" integer, "imdbId" varchar, "status" integer NOT NULL DEFAULT (1), "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), CONSTRAINT "UQ_7157aad07c73f6a6ae3bbd5ef5e" UNIQUE ("tmdbId"), CONSTRAINT "UQ_41a289eb1fa489c1bc6f38d9c3c" UNIQUE ("tvdbId"), CONSTRAINT "UQ_7ff2d11f6a83cb52386eaebe74b" UNIQUE ("imdbId"))`
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5" ON "media" ("tmdbId")`
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_41a289eb1fa489c1bc6f38d9c3" ON "media" ("tvdbId")`
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_7ff2d11f6a83cb52386eaebe74" ON "media" ("imdbId")`
    );

    await queryRunner.query(
      `CREATE TABLE "session" ("expiredAt" bigint NOT NULL, "id" varchar(255) PRIMARY KEY NOT NULL, "json" text NOT NULL)`
    );

    await queryRunner.query(
      `CREATE INDEX "IDX_28c5d1d16da7908c97c9bc2f74" ON "session" ("expiredAt")`
    );

    // Apply foreign keys after tables have been created
    await queryRunner.query(
      `ALTER TABLE "season_request" ADD CONSTRAINT "FK_6f14737e346d6b27d8e50d2157a" FOREIGN KEY ("requestId") REFERENCES "media_request" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_a1aa713f41c99e9d10c48da75a0" FOREIGN KEY ("mediaId") REFERENCES "media" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_6997bee94720f1ecb7f31137095" FOREIGN KEY ("requestedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD CONSTRAINT "FK_f4fc4efa14c3ba2b29c4525fa15" FOREIGN KEY ("modifiedById") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drop all foreign keys
    await queryRunner.query(
      `ALTER TABLE "season_request" DROP CONSTRAINT "FK_6f14737e346d6b27d8e50d2157a"`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT "FK_a1aa713f41c99e9d10c48da75a0"`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT "FK_6997bee94720f1ecb7f31137095"`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP CONSTRAINT "FK_f4fc4efa14c3ba2b29c4525fa15"`
    );

    // indexes next
    await queryRunner.query(`DROP INDEX "IDX_28c5d1d16da7908c97c9bc2f74"`);

    await queryRunner.query(`DROP INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5"`);

    await queryRunner.query(`DROP INDEX "IDX_41a289eb1fa489c1bc6f38d9c3"`);

    await queryRunner.query(`DROP INDEX "IDX_7ff2d11f6a83cb52386eaebe74"`);

    // finally nuke the tables
    await queryRunner.query(`DROP TABLE "user"`);

    await queryRunner.query(`DROP TABLE "season_request"`);

    await queryRunner.query(`DROP TABLE "media_request"`);

    await queryRunner.query(`DROP TABLE "media"`);

    await queryRunner.query(`DROP TABLE "session"`);
  }
}
