import { createClient, getClients } from "@/services/client-service";
import { clientSchema, type ClientInput } from "@/validators/client-validator";
import { requireAdmin } from "@/utils/access-control";

export async function GET(request: Request) {
  try {
    const lastName = new URL(request.url).searchParams.get("lastName") ?? undefined;
    const clients = await getClients(lastName);

    return Response.json(clients);
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not load clients",
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);

    const body: ClientInput = clientSchema.parse(await request.json());
    const insertedId = await createClient(body);

    return Response.json(
      {
        insertedId,
        message: "Client created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Could not create client",
      },
      { status: 400 },
    );
  }
}
