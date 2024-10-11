
# How Repositories and Services Interact with the Database in Medusa

In Medusa.js, the **repositories** are responsible for directly interacting with the database. Repositories are specialized classes that provide a way to query, retrieve, insert, update, and delete records from the database.

Here’s how the interaction between services, repositories, and the database works:

## 1. Repositories Handle Database Interactions
Repositories encapsulate the logic for interacting with the database. They define how data is retrieved, inserted, updated, and deleted. A repository is typically linked to a specific database entity (e.g., `app_config`).

## 2. Services Use Repositories
Services do not directly interact with the database. Instead, they interact with repositories to retrieve or modify data. This allows the service to focus on business logic while leaving the actual database operations to the repository.

For example:
- Your **service** (`AppConfigService`) contains business logic (e.g., getting a configuration value or performing some calculations).
- The **repository** (`AppConfigRepository`) handles the actual database queries, such as fetching the `app_config` table from the database.

## How It Works in Medusa:
1. **Define the Entity**: First, you define an entity that maps to your database table.
2. **Create a Repository**: The repository interacts with the entity (and hence the database).
3. **Service Uses the Repository**: The service calls the repository to perform operations on the data.

### Example of Each Step:

### Step 1: Define the Entity (in `src/models/app-config.ts`)
This represents your database table, `app_config`, and maps fields in the table to the properties of the class.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class AppConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  global_app_password_protection: boolean;

  @Column({ nullable: true })
  global_app_password: string;

  @Column()
  store_name: string;
}

export default AppConfig;
```

### Step 2: Create the Repository (in `src/repositories/app-config.ts`)
The repository handles database queries and operations related to the `app_config` entity.

```ts
import { EntityRepository, Repository } from "typeorm";
import AppConfig from "../models/app-config";

@EntityRepository(AppConfig)
class AppConfigRepository extends Repository<AppConfig> {
  // Custom query methods for app_config if needed
}

export default AppConfigRepository;
```

### Step 3: Use the Repository in a Service (in `src/services/app-config.ts`)
The service interacts with the repository to access or manipulate the `app_config` data.

```ts
import { TransactionBaseService } from "@medusajs/medusa";
import { EntityManager } from "typeorm";
import AppConfig from "../models/app-config";
import AppConfigRepository from "../repositories/app-config";

class AppConfigService extends TransactionBaseService {
  protected manager_: EntityManager;
  protected appConfigRepository_: typeof AppConfigRepository;

  constructor({ manager, appConfigRepository }) {
    super();
    this.manager_ = manager;
    this.appConfigRepository_ = appConfigRepository;
  }

  // Example method to fetch all configurations
  async getAllConfigs() {
    const appConfigRepo = this.manager_.getCustomRepository(this.appConfigRepository_);
    return appConfigRepo.find(); // Query the app_config table and return all rows
  }
}

export default AppConfigService;
```

### Step 4: Register the Repository in the DI Container (in `src/loaders/services.ts`)
The repository is registered in the dependency injection container so it can be injected into services.

```ts
import AppConfigRepository from "../repositories/app-config";

export default {
  registerServices: ({ container }) => {
    container.register("appConfigRepository", asClass(AppConfigRepository));
  }
};
```

### Step 5: Use the Service in Your API Route (in `src/api/config.ts`)
Now, in your API route, you can use the service, which in turn interacts with the repository to fetch data from the database.

```ts
export const GET = async (req, res) => {
  const appConfigService = req.scope.resolve("appConfigService");
  const configs = await appConfigService.getAllConfigs(); // Fetch all configs

  res.json(configs);
};
```

## How It All Works:
1. **Entity** (`AppConfig`) defines the structure of your table.
2. **Repository** (`AppConfigRepository`) handles database operations related to the `app_config` table.
3. **Service** (`AppConfigService`) uses the repository to perform business logic and data retrieval/manipulation.
4. **API Route** calls the service, which in turn interacts with the database via the repository.

## Why Use This Structure?
- **Separation of Concerns**: The service focuses on business logic, while the repository handles database operations.
- **Reusability**: Repositories can be reused across multiple services or parts of the application.
- **Testability**: It’s easier to mock repositories when testing service logic.

## Summary
- **Repositories** interact directly with the database.
- **Services** use repositories to implement business logic.
- **Entities** map database tables to TypeScript/JavaScript objects.
- **Dependency Injection (DI)** ensures that repositories and services are available where needed, without hardcoding dependencies. 

This structure makes your Medusa backend more modular, maintainable, and scalable.
