import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const configService = req.scope.resolve("configService");

  try {
    const appConfigData = await configService.list();

    res.json({
      success: true,
      data: {
        id: appConfigData[0].id,
        global_app_password_protection:
          appConfigData[0].global_app_password_protection,
      },
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
