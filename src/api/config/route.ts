import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  console.log(`${req.path} API route hit at ${new Date()}`);

  const configService = req.scope.resolve("configService");

  try {
    const appConfigData = await configService.list();

    res.json({
      success: true,
      data: appConfigData,
      metadata: {
        fullUrl: req.originalUrl,
        routePath: req.path,
        currentDateTime: new Date(),
      },
    });
  } catch (error) {
    console.error("Error fetching app config data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve app configuration data",
    });
  }
};
