import { ClientModel } from "@/models/client-model";
import { clients as sampleClients } from "@/constants/client-data";
import { toClient } from "@/utils/client-mappers";
import { connectMongoose } from "@/utils/mongoose-client";
import type { Client } from "@/types/client-t";

export async function getClients(): Promise<Client[]> {
  try {
    await connectMongoose();
    const documents = await ClientModel.find({}).sort({ number: 1 }).lean();

    return documents.map(toClient);
  } catch (error) {
    console.error("Could not load clients from MongoDB", error);

    return sampleClients;
  }
}
