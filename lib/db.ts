
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment ");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const option = {
      bufferCommands: true,
      maxPoolSize: 5,
    }
    cached.promise = mongoose
      .connect(MONGODB_URI, option)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw new Error(`check your connection string ${error}`);
  }

}