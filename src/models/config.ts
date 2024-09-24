import { BeforeInsert, Entity, Column } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class AppConfig extends BaseEntity {
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
