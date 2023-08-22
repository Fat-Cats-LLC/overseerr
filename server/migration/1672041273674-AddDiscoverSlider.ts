import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscoverSlider1672041273674 implements MigrationInterface {
  name = 'AddDiscoverSlider1672041273674';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "discover_slider" ("id" SERIAL PRIMARY KEY, "type" integer NOT NULL, "order" integer NOT NULL, "isBuiltIn" boolean NOT NULL DEFAULT (false), "enabled" boolean NOT NULL DEFAULT (true), "title" varchar, "data" varchar, "createdAt" timestamp without time zone NOT NULL DEFAULT (now()), "updatedAt" timestamp without time zone NOT NULL DEFAULT (now()))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "discover_slider"`);
  }
}
