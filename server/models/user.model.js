import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  phone: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    default: "user",
  },
});

// Create a model from the schema and export it
const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
