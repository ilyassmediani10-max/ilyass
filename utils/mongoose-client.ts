import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? process.env.MONGODB_URI;
const MONGO_DB =
  process.env.MONGO_DB ?? process.env.MONGODB_DB ?? "renovation_manager";

type MongooseCache = {
  conn?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
};

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cache = globalThis.__mongooseCache ?? (globalThis.__mongooseCache = {});

export async function connectMongoose() {
  if (!MONGO_URI) {
    throw new Error("Missing MONGO_URI");
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    const connectionString = MONGO_URI.includes("?")
      ? MONGO_URI
      : `${MONGO_URI}/${MONGO_DB}`;

    cache.promise = mongoose.connect(connectionString, {
      bufferCommands: false,
      dbName: MONGO_DB,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
