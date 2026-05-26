import { deleteClient, updateClient } from "@/services/client-service";
import { requireAdmin } from "@/utils/access-control";
import { getApiErrorMessage } from "@/utils/api-error";
import { clientSchema, type ClientInput } from "@/validators/client-validator";

export async function PUT(
  request: Request,
  ctx: RouteContext<"/api/clients/[clientId]">,
) {
  try {
    await requireAdmin(request);

    const { clientId } = await ctx.params;
    const body: ClientInput = clientSchema.parse(await request.json());

    await updateClient(clientId, body);

    return Response.json({
      message: "Client updated successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not update client"),
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  ctx: RouteContext<"/api/clients/[clientId]">,
) {
  try {
    await requireAdmin(request);

    const { clientId } = await ctx.params;

    await deleteClient(clientId);

    return Response.json({
      message: "Client deleted successfully",
    });
  } catch (error) {
    return Response.json(
      {
        message: getApiErrorMessage(error, "Could not delete client"),
      },
      { status: 400 },
    );
  }
}
