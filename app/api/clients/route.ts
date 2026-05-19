import { NextResponse } from "next/server";
import { getDatabase } from "@/utils/mongodb";
import type { Client } from "@/app/clients/client-data";

type ClientDocument = Client & {
  _id?: unknown;
};

function cleanClient(client: Client): Client {
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

function toClient(document: ClientDocument): Client {
  return {
    number: document.number,
    name: document.name,
    phone: document.phone,
    email: document.email,
    address: document.address,
    status: document.status,
    totalSpent: document.totalSpent,
    lastOrder: document.lastOrder,
    deadline: document.deadline,
  };
}

export async function GET() {
  const database = await getDatabase();
  const clients = await database
    .collection<ClientDocument>("clients")
    .find({})
    .sort({ number: 1 })
    .toArray();

  return NextResponse.json(clients.map(toClient));
}

export async function POST(request: Request) {
  const client = cleanClient((await request.json()) as Client);
  const database = await getDatabase();

  if (!client.number || !client.name) {
    return NextResponse.json(
      { error: "Client number and name are required." },
      { status: 400 },
    );
  }

  const existingClient = await database
    .collection<Client>("clients")
    .findOne({ number: client.number });

  if (existingClient) {
    return NextResponse.json(
      { error: "A client with this number already exists." },
      { status: 409 },
    );
  }

  const result = await database.collection<Client>("clients").insertOne(client);

  return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
}
