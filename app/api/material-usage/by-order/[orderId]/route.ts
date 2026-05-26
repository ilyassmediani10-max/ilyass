import { getMaterialUsageByOrder } from "@/services/material-service";

export async function GET(
  request: Request,
  ctx: RouteContext<"/api/material-usage/by-order/[orderId]">,
) {
  try {
    const { orderId } = await ctx.params;
    const usage = await getMaterialUsageByOrder(orderId);

    return Response.json(usage);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not load material usage",
      },
      { status: 400 },
    );
  }
}
