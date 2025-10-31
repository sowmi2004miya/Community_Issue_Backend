import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // ✅ Use process.env.MONGO_URI directly
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
