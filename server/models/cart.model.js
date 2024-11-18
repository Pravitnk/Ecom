import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Referencing the user model by clerkId
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products", // This assumes you have a Product model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        }, // Optional field for the price of each item at the time of purchase
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema and export it
const Cart = mongoose.models.cart || mongoose.model("cart", cartSchema);
export default Cart;
