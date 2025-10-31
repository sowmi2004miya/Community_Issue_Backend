import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"; // 💡 Added mongoose import
import issueRoutes from "./routes/issueroutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Function to connect to MongoDB (formerly in db.js)
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;// [cite: 1]

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Start Server and connect to DB
const startServer = async () => {
  await connectDB(); // 💡 Connect to DB before setting up routes

  // Routes
  app.use("/api/issues", issueRoutes);

  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
};

startServer();