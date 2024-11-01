// src/services/app-config.ts
import { TransactionBaseService } from "@medusajs/medusa";
import { AppConfig } from "../models/config";

class AppConfigService extends TransactionBaseService {
  constructor({ manager }) {
    super(arguments[0]);
    this.manager_ = manager;
  }

  async list() {
    const appConfigRepo = this.activeManager_.getRepository(AppConfig);
    return await appConfigRepo.find();
  }
}

export default AppConfigService;
