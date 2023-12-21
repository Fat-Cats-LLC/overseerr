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
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "serviceId"`);
    await queryRunner.query(`ALTER TABLE "media" DROP COLUMN "serviceId4k"`);
    await queryRunner.query(
      `ALTER TABLE "media" DROP COLUMN "externalServiceId"`
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP COLUMN "externalServiceId4k"`
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP COLUMN "externalServiceSlug"`
    );
    await queryRunner.query(
      `ALTER TABLE "media" DROP COLUMN "externalServiceSlug4k"`
    );
  }
}
