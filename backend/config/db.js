import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000, // fast fail
    });

    isConnected = conn.connections[0].readyState;
    
    console.log("MongoDB connected successfully");
    console.log(`Host: ${conn.connection.host}`);

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    // ❌ pura app band mat kar (production me bad practice)
    // process.exit(1);

    // retry after 5 sec
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;