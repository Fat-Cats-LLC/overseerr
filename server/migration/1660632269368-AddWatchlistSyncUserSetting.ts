import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWatchlistSyncUserSetting1660632269368
  implements MigrationInterface
{
  name = 'AddWatchlistSyncUserSetting1660632269368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "watchlistSyncMovies" boolean`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "watchlistSyncTv" boolean`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "watchlistSyncMovies"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_settings" DROP COLUMN "watchlistSyncTv"`
    );
  }
}
