import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisplayNameToUser1611508672722 implements MigrationInterface {
  name = 'AddDisplayNameToUser1611508672722';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "plexUsername" varchar`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "plexUsername"`);
  }
}
