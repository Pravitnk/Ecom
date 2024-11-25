import mongoose from "mongoose";

const addAddressSchema = new mongoose.Schema(
  {
    clerkId: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "user", // Assuming you have a User model
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true, // To remove extra spaces around the address
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      match: /^[0-9]{6}$/, // Example regex for 6-digit pincode
    },
    phone: { type: String, required: true, match: /^[0-9]{10,15}$/ },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Optional: Index on userId for fast lookups
// addAddressSchema.index({ userId: 1 });

const Address =
  mongoose.models.Address || mongoose.model("Address", addAddressSchema);
export default Address;
