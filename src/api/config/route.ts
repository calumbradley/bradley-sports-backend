import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // Get the relative path (without query params)
  console.log(`${req.path} api route hit at ${new Date()}`);
  const appConfigService = req.scope.resolve("appConfigService");
  const message = appConfigService.getMessage();
  const fullUrl = req.originalUrl;
  const routePath = req.path;
  const currentDateTime = new Date();

  res.json({
    message,
    fullUrl,
    routePath,
    currentDateTime,
  });
};
