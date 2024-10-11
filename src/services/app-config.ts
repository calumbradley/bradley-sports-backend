import { TransactionBaseService } from "@medusajs/medusa";

class AppConfigService extends TransactionBaseService {
  getMessage() {
    return `Welcome to My Store!`;
  }
}

export default AppConfigService;
