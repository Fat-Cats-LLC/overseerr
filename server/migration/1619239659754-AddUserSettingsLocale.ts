import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserSettingsLocale1619239659754 implements MigrationInterface {
  name = 'AddUserSettingsLocale1619239659754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_settings" ADD COLUMN "locale" varchar NOT NULL DEFAULT ('')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_settings" DROP COLUMN "locale"`);
  }
}
