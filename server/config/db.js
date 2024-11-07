import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseConnection = async () => {
  console.log("mongo:", process.env.MONGO_URI);

  try {
    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to MongoDB");
    });
    await mongoose.connect(`${process.env.MONGO_URI}/ecom`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default databaseConnection;
