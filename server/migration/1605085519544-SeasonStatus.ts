import type { MigrationInterface, QueryRunner } from 'typeorm';

export class SeasonStatus1605085519544 implements MigrationInterface {
  name = 'SeasonStatus1605085519544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "season" ("id" SERIAL PRIMARY KEY, "seasonNumber" integer NOT NULL, "status" integer NOT NULL DEFAULT (1), "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()), "mediaId" integer)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "season"`);
  }
}
