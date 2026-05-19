import { NextResponse } from "next/server";
import { getDatabase } from "@/utils/mongodb";
import type { Client } from "@/app/clients/client-data";

type IContext = {
  params: Promise<{
    clientNumber: string;
  }>;
};

function trimClient(client: Client): Client {
  return {
    number: client.number.trim(),
    name: client.name.trim(),
    phone: client.phone.trim(),
    email: client.email.trim(),
    address: client.address.trim(),
    status: client.status.trim(),
    totalSpent: client.totalSpent.trim(),
    lastOrder: client.lastOrder.trim(),
    deadline: client.deadline.trim(),
  };
}

export async function PATCH(request: Request, context: IContext) {
  const { clientNumber } = await context.params;
  const number = decodeURIComponent(clientNumber);
  const client = trimClient((await request.json()) as Client);
  const db = await getDatabase();

  if (!client.name || !client.number) {
    return NextResponse.json(
      { error: "Client number and name are required." },
      { status: 400 },
    );
  }

  const result = await db
    .collection<Client>("clients")
    .updateOne({ number }, { $set: { ...client, number } });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  return NextResponse.json({ updated: result.modifiedCount });
}

export async function DELETE(_request: Request, context: IContext) {
  const { clientNumber } = await context.params;
  const db = await getDatabase();
  const result = await db
    .collection<Client>("clients")
    .deleteOne({ number: decodeURIComponent(clientNumber) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  return NextResponse.json({ deleted: result.deletedCount });
}
