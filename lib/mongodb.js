import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables manually
dotenv.config();

const MONGODB_URI = "mongodb://localhost:27017/videoDB";

if (!MONGODB_URI) {
    throw new Error("❌ MongoDB connection string is missing in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
    if (cached.conn) {
        console.log("✅ Already connected to MongoDB");
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = await mongoose.connect(MONGODB_URI);

    }

    try {
        cached.conn = await cached.promise;
        console.log("✅ MongoDB Connected!");
        return cached.conn;
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
    }
}

export default connectDB;
global.mongoose = cached;
