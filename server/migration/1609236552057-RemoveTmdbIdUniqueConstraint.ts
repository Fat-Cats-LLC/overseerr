import type { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveTmdbIdUniqueConstraint1609236552057
  implements MigrationInterface
{
  name = 'RemoveTmdbIdUniqueConstraint1609236552057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" DROP CONSTRAINT "UQ_7157aad07c73f6a6ae3bbd5ef5e"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media" ADD CONSTRAINT "UQ_7157aad07c73f6a6ae3bbd5ef5e" UNIQUE ("tmdbId")`
    );
  }
}
