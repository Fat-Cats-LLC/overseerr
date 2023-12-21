import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastSeasonChangeMedia1608477467935
  implements MigrationInterface
{
  name = 'AddLastSeasonChangeMedia1608477467935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD COLUMN "lastSeasonChange" timestamp without time zone NOT NULL DEFAULT (transaction_timestamp())`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP COLUMN "lastSeasonChange"`
    );
  }
}
