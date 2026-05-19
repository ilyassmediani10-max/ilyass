import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ClientModel } from "@/models/client-model";
import { trimClient } from "@/utils/client-mappers";
import { connectMongoose } from "@/utils/mongoose-client";
import type { Client } from "@/types/client-t";

type IContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, context: IContext) {
  const { id } = await context.params;
  const client = trimClient((await request.json()) as Client);
  await connectMongoose();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid client id." }, { status: 400 });
  }

  if (!client.name || !client.number) {
    return NextResponse.json(
      { error: "Client number and name are required." },
      { status: 400 },
    );
  }

  const result = await ClientModel.updateOne({ _id: id }, { $set: client });

  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  return NextResponse.json({ updated: result.modifiedCount });
}

export async function DELETE(_request: Request, context: IContext) {
  const { id } = await context.params;
  await connectMongoose();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid client id." }, { status: 400 });
  }

  const result = await ClientModel.deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Client not found." }, { status: 404 });
  }

  return NextResponse.json({ deleted: result.deletedCount });
}
