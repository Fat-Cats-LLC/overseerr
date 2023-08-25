import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SonarrRadarrSyncServiceFields1611757511674
  implements MigrationInterface
{
  name = 'SonarrRadarrSyncServiceFields1611757511674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "serviceId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "serviceId4k" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "externalServiceId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "externalServiceId4k" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "externalServiceSlug" varchar`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "externalServiceSlug4k" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_7ff2d11f6a83cb52386eaebe74"`);
    await queryRunner.query(`DROP INDEX "IDX_41a289eb1fa489c1bc6f38d9c3"`);
    await queryRunner.query(`DROP INDEX "IDX_7157aad07c73f6a6ae3bbd5ef5"`);
    await queryRunner.query(`ALTER TABLE "media" RENAME TO "temporary_media"`);
    await queryRunner.query(
      `CREATE TABLE "media" ("id" SERIAL PRIMARY KEY, "mediaType" varchar NOT NULL, "tmdbId" integer NOT NULL, "tvdbId" integer, "imdbId" varchar, "status" integer NOT NULL DEFAULT (1), "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "lastSeasonChange" timestamp without time zone NOT NULL DEFAULT (now()), "status4k" integer NOT NULL DEFAULT (1), "mediaAddedAt" datetime, CONSTRAINT "UQ_41a289eb1fa489c1bc6f38d9c3c" UNIQUE ("tvdbId"))`
    );
    await queryRunner.query(
      `INSERT INTO "media"("id", "mediaType", "tmdbId", "tvdbId", "imdbId", "status", "createdAt", "updatedAt", "lastSeasonChange", "status4k", "mediaAddedAt") SELECT "id", "mediaType", "tmdbId", "tvdbId", "imdbId", "status", "createdAt", "updatedAt", "lastSeasonChange", "status4k", "mediaAddedAt" FROM "temporary_media"`
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
