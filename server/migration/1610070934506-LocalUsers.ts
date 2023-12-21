import type { MigrationInterface, QueryRunner } from 'typeorm';

export class LocalUsers1610070934506 implements MigrationInterface {
  name = 'LocalUsers1610070934506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "plexId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" ADD COLUMN "password" varchar`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "userType" integer NOT NULL DEFAULT (1)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "plexId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userType"`);
  }
}
