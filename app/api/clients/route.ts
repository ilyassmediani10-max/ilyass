import { NextResponse } from "next/server";
import { ClientModel } from "@/models/client-model";
import { toClient, trimClient } from "@/utils/client-mappers";
import { connectMongoose } from "@/utils/mongoose-client";
import type { Client } from "@/types/client-t";

export async function GET() {
  await connectMongoose();
  const clients = await ClientModel.find({}).sort({ number: 1 }).lean();

  return NextResponse.json(clients.map(toClient));
}

export async function POST(request: Request) {
  const client = trimClient((await request.json()) as Client);
  await connectMongoose();

  if (!client.number || !client.name) {
    return NextResponse.json(
      { error: "Client number and name are required." },
      { status: 400 },
    );
  }

  const existing = await ClientModel.findOne({ number: client.number }).lean();

  if (existing) {
    return NextResponse.json(
      { error: "A client with this number already exists." },
      { status: 409 },
    );
  }

  const result = await ClientModel.create(client);

  return NextResponse.json({ insertedId: result._id }, { status: 201 });
}
