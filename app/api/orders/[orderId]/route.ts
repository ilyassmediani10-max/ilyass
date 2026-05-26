import { deleteOrder, updateOrder } from "@/services/order-service";
import { requireAdmin } from "@/utils/access-control";
import { orderSchema, type IOrderInput } from "@/validators/order-validator";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/orders/[orderId]">,
) {
  try {
    await requireAdmin(request);

    const { orderId } = await ctx.params;
    const body: IOrderInput = orderSchema.parse(await request.json());

    await updateOrder(orderId, body);

    return Response.json({
      message: "Order updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not update order",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  ctx: RouteContext<"/api/orders/[orderId]">,
) {
  try {
    await requireAdmin(request);

    const { orderId } = await ctx.params;

    await deleteOrder(orderId);

    return Response.json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not delete order",
      },
      { status: 400 },
    );
  }
}
