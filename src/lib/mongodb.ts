import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment variables.")

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    console.log("Connecting to MongoDB...")
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "profnitt",
      bufferCommands: false,
      retryWrites: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  }

  cached.conn = await cached.promise
  global.mongoose = cached

  console.log("MongoDB connected.")
  return cached.conn
}
