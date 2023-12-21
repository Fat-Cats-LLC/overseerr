import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPGPToUserSettings1615333940450 implements MigrationInterface {
  name = 'AddPGPToUserSettings1615333940450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "pgpKey" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_settings" DROP COLUMN "pgpKey"`);
  }
}
