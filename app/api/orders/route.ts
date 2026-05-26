import { createOrder, getExpiredOrders, getOrders, getOrdersExpiringThisMonth } from "@/services/order-service";
import { requireAdmin } from "@/utils/access-control";
import { getApiErrorMessage } from "@/utils/api-error";
import { orderSchema, type IOrderInput } from "@/validators/order-validator";

export async function GET(request: Request) {
  try {
    const filter = new URL(request.url).searchParams.get("filter");
    const orders =
      filter === "expired"
        ? await getExpiredOrders()
        : filter === "expiring-this-month"
          ? await getOrdersExpiringThisMonth()
          : await getOrders();

    return Response.json(orders);
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not load orders"),
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);

    const body: IOrderInput = orderSchema.parse(await request.json());
    const insertedId = await createOrder(body);

    return Response.json(
      {
        insertedId,
        message: "Order created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not create order"),
      },
      { status: 400 },
    );
  }
}
