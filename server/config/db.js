import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Cache connection across serverless function invocations
let cached = global.__mongooseConn;
if (!cached) {
  cached = global.__mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose
      .connect(process.env.MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // allow retry on next call
    console.error(`❌ MongoDB connection error: ${error.message}`);
    throw new Error(`Database connection failed: ${error.message}`);
  }

  return cached.conn;
};

export default connectDB;