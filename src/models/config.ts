// src/models/config.ts
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity({ name: "app_config" })
export class AppConfig {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  global_app_password_protection: boolean;

  @Column()
  global_app_password: string;

  @Column()
  store_name: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "appconfig");
  }
}
