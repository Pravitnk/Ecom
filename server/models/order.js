import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  userId: String,
  cartItems: [
    {
      productId: String,
      title: String,
      description: String,
      image: String,
      quantity: Number,
      price: String,
      salePrice: String,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    state: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  orderStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: Date,
  paymentId: String,
  payerId: String,
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
