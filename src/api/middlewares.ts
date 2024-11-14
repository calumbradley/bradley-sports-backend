import type { MiddlewaresConfig } from "@medusajs/medusa";
import cors from "cors";

export const config: MiddlewaresConfig = {
  routes: [
    {
      matcher: "/config*",
      middlewares: [
        cors({
          origin: "*",
          credentials: true,
        }),
      ],
    },
  ],
};
