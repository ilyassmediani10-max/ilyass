import { MongoClient, ServerApiVersion, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB ?? "renovation_manager";

if (!uri) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

declare global {
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);

export const clientPromise =
  global.mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  global.mongoClientPromise = clientPromise;
}

export async function getDatabase(): Promise<Db> {
  const connectedClient = await clientPromise;

  return connectedClient.db(databaseName);
}
