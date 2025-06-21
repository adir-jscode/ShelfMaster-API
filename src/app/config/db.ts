import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log("📔 Connected to MongoDb using Mongoose");
  } catch (error) {
    console.error("Mongodb connection error:", error);
  }
};

export default connectDB;
