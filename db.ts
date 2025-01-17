import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string, {});
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error while connecting to MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
