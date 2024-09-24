import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAppConfigTable1727191954452 implements MigrationInterface {
  name = "CreateAppConfigTable1727191954452";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE app_config (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        global_app_password_protection BOOLEAN NOT NULL,
        global_app_password VARCHAR(255),
        store_name VARCHAR(255)
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS app_config;`);
  }
}
