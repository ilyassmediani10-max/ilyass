import { getDatabase } from "@/utils/mongodb";
import { clients as sampleClients, type Client } from "./client-data";

type ClientDocument = Client & {
  _id?: unknown;
};

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

export async function getClients(): Promise<Client[]> {
  try {
    const database = await getDatabase();
    const documents = await database
      .collection<ClientDocument>("clients")
      .find({})
      .sort({ number: 1 })
      .toArray();

    return documents.map(toClient);
  } catch (error) {
    console.error("Could not load clients from MongoDB", error);

    return sampleClients;
  }
}
