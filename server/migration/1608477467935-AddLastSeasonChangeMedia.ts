import type { MigrationInterface, QueryRunner } from 'typeorm';
import logger from "@server/logger";

export class AddLastSeasonChangeMedia1608477467935
  implements MigrationInterface
{
  name = 'AddLastSeasonChangeMedia1608477467935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5"`);
    await queryRunner.query(`DROP INDEX "IDX_41a289eb1fa489c1bc6f38d9c3"`);
    await queryRunner.query(`DROP INDEX "IDX_7ff2d11f6a83cb52386eaebe74"`);
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT IF EXISTS "UQ_7157aad07c73f6a6ae3bbd5ef5e"`)
    await queryRunner.query(`ALTER TABLE "media" DROP CONSTRAINT IF EXISTS "UQ_41a289eb1fa489c1bc6f38d9c3c"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_media" ("id" SERIAL PRIMARY KEY, "mediaType" varchar NOT NULL, "tmdbId" integer NOT NULL, "tvdbId" integer, "imdbId" varchar, "status" integer NOT NULL DEFAULT (1), "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "lastSeasonChange" timestamp without time zone NOT NULL DEFAULT (now()), CONSTRAINT "UQ_7157aad07c73f6a6ae3bbd5ef5e" UNIQUE ("tmdbId"), CONSTRAINT "UQ_41a289eb1fa489c1bc6f38d9c3c" UNIQUE ("tvdbId"))`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_media"("id", "mediaType", "tmdbId", "tvdbId", "imdbId", "status", "createdAt", "updatedAt") SELECT "id", "mediaType", "tmdbId", "tvdbId", "imdbId", "status", "createdAt", "updatedAt" FROM "media"`
    );
    await queryRunner.query(`DROP TABLE "media" CASCADE`);
    await queryRunner.query(`ALTER TABLE "temporary_media" RENAME TO "media"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5" ON "media" ("tmdbId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41a289eb1fa489c1bc6f38d9c3" ON "media" ("tvdbId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ff2d11f6a83cb52386eaebe74" ON "media" ("imdbId") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_7ff2d11f6a83cb52386eaebe74"`);
    await queryRunner.query(`DROP INDEX "IDX_41a289eb1fa489c1bc6f38d9c3"`);
    await queryRunner.query(`DROP INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5"`);
    await queryRunner.query(`ALTER TABLE "media" RENAME TO "temporary_media"`);
    await queryRunner.query(
      `CREATE TABLE "media" ("id" SERIAL PRIMARY KEY, "mediaType" varchar NOT NULL, "tmdbId" integer NOT NULL, "tvdbId" integer, "imdbId" varchar, "status" integer NOT NULL DEFAULT (1), "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), CONSTRAINT "UQ_7157aad07c73f6a6ae3bbd5ef5e" UNIQUE ("tmdbId"), CONSTRAINT "UQ_41a289eb1fa489c1bc6f38d9c3c" UNIQUE ("tvdbId"))`
    );
    await queryRunner.query(
      `INSERT INTO "media"("id", "mediaType", "tmdbId", "tvdbId", "imdbId", "status", "createdAt", "updatedAt") SELECT "id", "mediaType", "tmdbId", "tvdbId", "imdbId", "status", "createdAt", "updatedAt" FROM "temporary_media"`
    );
    await queryRunner.query(`DROP TABLE "temporary_media"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_7ff2d11f6a83cb52386eaebe74" ON "media" ("imdbId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41a289eb1fa489c1bc6f38d9c3" ON "media" ("tvdbId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5" ON "media" ("tmdbId") `
    );
  }
}
