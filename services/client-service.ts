import mongoose from "mongoose";
import { clients as sampleClients } from "@/constants/client-data";
import { ClientModel } from "@/models/client-model";
import { toClient } from "@/utils/client-mappers";
import { connectMongoose } from "@/utils/mongoose-client";
import type { Client } from "@/types/client-t";

function ensureObjectId(clientId: string) {
  if (!mongoose.Types.ObjectId.isValid(clientId)) {
    throw new Error("Invalid client id");
  }
}

export async function getClients(lastName?: string): Promise<Client[]> {
  try {
    await connectMongoose();
    const query = lastName
      ? { lastName: { $regex: lastName.trim(), $options: "i" } }
      : {};
    const documents = await ClientModel.find(query).sort({ clientNumber: 1 }).lean();

    return documents.map(toClient);
  } catch (error) {
    console.error("Could not load clients from MongoDB", error);

    return sampleClients;
  }
}

export async function createClient(client: Client) {
  await connectMongoose();
  const existing = await ClientModel.findOne({ clientNumber: client.clientNumber }).lean();

  if (existing) {
    throw new Error("A client with this number already exists.");
  }

  const result = await ClientModel.create(client);

  return String(result._id);
}

export async function updateClient(clientId: string, client: Client) {
  ensureObjectId(clientId);
  await connectMongoose();

  const existing = await ClientModel.findOne({
    _id: { $ne: clientId },
    clientNumber: client.clientNumber,
  }).lean();

  if (existing) {
    throw new Error("A client with this number already exists.");
  }

  const result = await ClientModel.updateOne({ _id: clientId }, { $set: client });

  if (result.matchedCount === 0) {
    throw new Error("Client not found.");
  }
}

export async function deleteClient(clientId: string) {
  ensureObjectId(clientId);
  await connectMongoose();

  const result = await ClientModel.deleteOne({ _id: clientId });

  if (result.deletedCount === 0) {
    throw new Error("Client not found.");
  }
}
