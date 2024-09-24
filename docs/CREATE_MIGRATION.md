# Steps to Create and Run a TypeORM Migration in Medusa

### 1. **Open the Migration File**

- Navigate to `src/migrations/CreateAppConfigTable.ts`. You'll find the `up()` and `down()` methods.

### 2. **Define the Schema in `up()`**

- In the `up()` method, define the SQL to create the `app_config` table:

```typescript
public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE app_config (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        global_app_password_protection BOOLEAN NOT NULL,
        global_app_password VARCHAR(255),
        store_name VARCHAR(255)
      );
    `);
}
```

- Use down() to revert changes (e.g., drop the table).

### 3. Run the Migration

```bash
npx typeorm migration:run
```

- Check your PostgreSQL database for the new app_config table.
