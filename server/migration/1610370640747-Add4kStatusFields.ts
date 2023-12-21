import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Add4kStatusFields1610370640747 implements MigrationInterface {
  name = 'Add4kStatusFields1610370640747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "season" ADD COLUMN "status4k" integer NOT NULL DEFAULT (1)`
    );
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "status4k" integer NOT NULL DEFAULT (1)`
    );

    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "is4k" boolean NOT NULL DEFAULT (false)`
    );

    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "serverId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "profileId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" ADD COLUMN "rootFolder" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "season" DROP COLUMN "status4k"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "status4k"`);

    await queryRunner.query(`ALTER TABLE "media_request" DROP COLUMN "is4k"`);

    await queryRunner.query(
      `ALTER TABLE "media_request" DROP COLUMN "serverId"`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP COLUMN "profileId"`
    );
    await queryRunner.query(
      `ALTER TABLE "media_request" DROP COLUMN "rootFolder"`
    );
  }
}
